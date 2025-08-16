import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at?: string;
    updated_at?: string;
    // Información de roles y permisos
    rol_principal: 'super-admin' | 'administrador' | 'empleado' | 'sin-rol';
    es_super_admin: boolean;
    es_administrador: boolean;
    es_empleado: boolean;
    roles: string[];
    permisos: string[];
    [key: string]: unknown; // This allows for additional properties...
}
