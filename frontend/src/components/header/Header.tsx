'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '@/components/branding/Logo';
import Input from '@/components/ui/Input';

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);

    /**
     * Ctrl+F or Cmd+F to focus on search input
     */
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const isCtrlF = event.ctrlKey && event.key === 'f';
            const isCmdF = isMac && event.metaKey && event.key === 'f';

            if (isCtrlF || isCmdF) {
                event.preventDefault();
                searchInputRef.current.focus();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex gap-x-12 items-center">
                    <a href="#" className="-m-1.5 p-1.5 flex-shrink-0">
                        <span className="sr-only">Your Company</span>
                        <Logo width={50} height={50}/>
                    </a>
                    <div className="hidden lg:flex">
                        <Input ref={searchInputRef} id="search" name="search" type="search" placeholder="search..."/>
                    </div>
                </div>
                <div className="flex lg:hidden">
                    <Input ref={searchInputRef} id="search" name="search" type="search" placeholder="search..."/>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-1.5 p-1.5 w-[50px] h-[50px] inline-flex items-center justify-center rounded-md text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </a>
                    ))}
                    <a href="login" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5 flex-shrink-0">
                            <span className="sr-only">Your Company</span>
                            <Logo width={50} height={50}/>
                        </a>
                        <div className="flex lg:hidden">
                            <Input ref={searchInputRef} id="search" name="search" type="search"
                                   placeholder="search..."/>
                        </div>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-1.5 p-1.5 w-[50px] h-[50px] rounded-md text-gray-700 justify-center items-center flex"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </header>
    );
}
