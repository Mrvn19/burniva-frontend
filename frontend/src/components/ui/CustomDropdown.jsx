import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search, AlertCircle, Loader2 } from 'lucide-react';

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const CustomDropdown = ({
    value,
    onChange,
    options = [],
    placeholder = "Pilih salah satu...",
    disabled = false,
    loading = false,
    error = false,
    errorMessage = "",
    className = "",
    name = "",
    searchable,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [dropdownStyles, setDropdownStyles] = useState({});
    
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const location = useLocation();

    // Format options to standard { label, value } format
    const formattedOptions = useMemo(() => {
        return options.map(opt => {
            if (typeof opt === 'string' || typeof opt === 'number') {
                return { label: String(opt), value: String(opt) };
            }
            return opt;
        });
    }, [options]);

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
        if (!searchQuery) return formattedOptions;
        return formattedOptions.filter(opt => 
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [formattedOptions, searchQuery]);

    const showSearch = searchable !== undefined ? searchable : formattedOptions.length > 8;
    const selectedOption = formattedOptions.find(opt => opt.value === String(value));

    // Calculate dropdown position
    const updatePosition = () => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Check if there is enough space below
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = Math.min(filteredOptions.length * 40 + (showSearch ? 60 : 20), 256); // approx max-h-64 (256px)
            
            const showAbove = spaceBelow < menuHeight && rect.top > menuHeight;
            
            setDropdownStyles({
                position: 'fixed',
                top: showAbove ? rect.top - menuHeight - 8 : rect.bottom + 8,
                left: rect.left,
                width: rect.width,
                zIndex: 9999, // Ensure it's on top of modals/cards
            });
        }
    };

    // Close on click outside, scroll, resize, route change
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            if (isOpen) {
                updatePosition();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('resize', handleScrollOrResize);
            window.addEventListener('scroll', handleScrollOrResize, true); // capture phase for scrollable parents
            updatePosition();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleScrollOrResize);
            window.removeEventListener('scroll', handleScrollOrResize, true);
        };
    }, [isOpen, filteredOptions.length]); // dependency on options to recalculate height if filtered

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');
            setFocusedIndex(formattedOptions.findIndex(opt => opt.value === String(value)));
            if (showSearch && searchInputRef.current) {
                setTimeout(() => searchInputRef.current.focus(), 10);
            }
        }
    }, [isOpen, showSearch, value, formattedOptions]);

    // Keyboard Navigation
    const handleKeyDown = (e) => {
        if (disabled || loading) return;

        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[focusedIndex].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
            case 'Tab':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const handleSelect = (val) => {
        if (onChange) {
            // Mock native event
            onChange({
                target: { name, value: val }
            });
        }
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <div className={classNames("relative w-full", className)}>
            {/* TRIGGER BUTTON */}
            <button
                ref={triggerRef}
                type="button"
                disabled={disabled || loading}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={classNames(
                    "w-full flex items-center justify-between text-left",
                    "bg-white border rounded-xl px-4 py-3 text-sm transition-all outline-none",
                    error 
                        ? "border-red-300 focus:ring-2 focus:ring-red-100" 
                        : "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-50",
                    (disabled || loading) ? "bg-slate-50 opacity-70 cursor-not-allowed" : "cursor-pointer hover:border-slate-300",
                    isOpen && !error && "border-primary-500 ring-2 ring-primary-50"
                )}
            >
                <div className="flex items-center gap-2 truncate">
                    {loading && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                    <span className={classNames("truncate", !selectedOption && "text-slate-400")}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown 
                    className={classNames(
                        "w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0",
                        isOpen && "rotate-180"
                    )} 
                />
            </button>

            {/* ERROR MESSAGE */}
            {error && errorMessage && (
                <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-medium px-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* PORTAL DROPDOWN MENU */}
            {isOpen && createPortal(
                <div
                    ref={dropdownRef}
                    style={dropdownStyles}
                    className="bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100 origin-top"
                >
                    {showSearch && (
                        <div className="p-2 border-b border-slate-50 shrink-0">
                            <div className="relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchQuery}
                                    onChange={e => {
                                        setSearchQuery(e.target.value);
                                        setFocusedIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-slate-50 text-sm rounded-lg pl-9 pr-3 py-2 border-none focus:ring-1 focus:ring-primary-500 focus:bg-white outline-none transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    <ul className="max-h-64 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-8 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
                                <Search className="w-6 h-6 text-slate-300" />
                                <span>Tidak ada data ditemukan</span>
                            </li>
                        ) : (
                            filteredOptions.map((opt, idx) => {
                                const isSelected = opt.value === String(value);
                                const isFocused = idx === focusedIndex;

                                return (
                                    <li
                                        key={opt.value}
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => handleSelect(opt.value)}
                                        onMouseEnter={() => setFocusedIndex(idx)}
                                        className={classNames(
                                            "px-4 py-2.5 text-sm cursor-pointer mx-1 rounded-lg transition-colors flex items-center justify-between",
                                            isSelected 
                                                ? "bg-primary-50 text-primary-700 font-semibold" 
                                                : isFocused 
                                                    ? "bg-slate-50 text-slate-800" 
                                                    : "text-slate-700 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className="truncate">{opt.label}</span>
                                        {isSelected && (
                                            <svg className="w-4 h-4 text-primary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>,
                document.body
            )}
        </div>
    );
};

export default CustomDropdown;
