# Admin Dashboard - Design Guide

## 🎨 Visual Design System

This document provides a comprehensive guide to the visual design system used in the Life Box Admin Dashboard.

---

## 🎯 Design Principles

1. **Clarity** - Clear visual hierarchy and information structure
2. **Consistency** - Unified design language across all pages
3. **Efficiency** - Quick access to important features
4. **Responsiveness** - Seamless experience on all devices
5. **Delight** - Subtle animations and polished interactions

---

## 🖼️ Layout Structure

```
┌─────────────────────────────────────────────────┐
│                  Top Header                      │
│  [Menu] [Search]  [Store Link] [🔔] [Profile]  │
└─────────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────────┐
│          │                                       │
│          │         Main Content Area            │
│          │                                       │
│ Sidebar  │  ┌─────────────────────────────┐   │
│          │  │                             │   │
│ - Over.. │  │      Stats Grid (4 cols)    │   │
│ - Cata.. │  │                             │   │
│ - Cont.. │  └─────────────────────────────┘   │
│ - Mark.. │                                       │
│ - Sale.. │  ┌─────────────────────────────┐   │
│ - Syst.. │  │                             │   │
│          │  │    Content Cards & Tables   │   │
│          │  │                             │   │
│ [User]   │  └─────────────────────────────┘   │
│ [Logout] │                                       │
└──────────┴──────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│                    Footer                        │
└─────────────────────────────────────────────────┘
```

**Key Measurements:**
- Sidebar width: `288px` (w-72)
- Header height: Auto (sticky)
- Content padding: `24px` (lg:p-6)
- Max content width: Full width
- Grid gap: `24px` (gap-6)

---

## 🎨 Color Palette

### Primary Colors

**Purple Gradient (Brand)**
```css
/* Light Purple */
#6B21A8 - Sidebar hover states
#8B5CF6 - Accent elements

/* Dark Purple */
#3D1A6E - Primary brand color
#2D1050 - Sidebar background start
#1a0a3c - Sidebar background end
```

**Pink Accent**
```css
#E91E8C - Secondary brand color
#EC4899 - Lighter accent
```

**Gradient Combinations**
```css
/* Primary Button */
background: linear-gradient(135deg, #3D1A6E, #E91E8C)

/* Sidebar Background */
background: linear-gradient(180deg, #2D1050, #1a0a3c)

/* Icon Background */
background: linear-gradient(135deg, #6B21A8, #EC4899)
```

### Status Colors

**Success (Green)**
```css
#10B981 - Success actions, delivered status
#D1FAE5 - Success background (light)
#065F46 - Success text (dark)
```

**Warning (Yellow/Orange)**
```css
#F59E0B - Warning, pending status
#FEF3C7 - Warning background (light)
#92400E - Warning text (dark)
```

**Error (Red)**
```css
#EF4444 - Errors, cancelled status
#FEE2E2 - Error background (light)
#991B1B - Error text (dark)
```

**Info (Blue)**
```css
#3B82F6 - Information, processing status
#DBEAFE - Info background (light)
#1E40AF - Info text (dark)
```

### Neutral Colors

**Grays**
```css
#111827 - gray-900 - Primary text
#374151 - gray-700 - Secondary text
#6B7280 - gray-600 - Tertiary text
#9CA3AF - gray-400 - Placeholder text
#E5E7EB - gray-200 - Borders
#F3F4F6 - gray-100 - Subtle backgrounds
#F9FAFB - gray-50 - Page background
#FFFFFF - white - Card backgrounds
```

---

## 📐 Spacing System

### Tailwind Spacing Scale
```
space-1  = 4px   (0.25rem)
space-2  = 8px   (0.5rem)
space-3  = 12px  (0.75rem)
space-4  = 16px  (1rem)
space-5  = 20px  (1.25rem)
space-6  = 24px  (1.5rem)
space-8  = 32px  (2rem)
space-10 = 40px  (2.5rem)
space-12 = 48px  (3rem)
```

### Usage Guidelines

**Page Padding**
```tsx
<main className="p-4 lg:p-6">
  // 16px mobile, 24px desktop
</main>
```

**Card Padding**
```tsx
<div className="p-6">
  // 24px all sides
</div>
```

**Section Gaps**
```tsx
<div className="space-y-6">
  // 24px vertical spacing between children
</div>
```

**Grid Gaps**
```tsx
<div className="gap-6">
  // 24px gap between grid items
</div>
```

---

## 🔤 Typography

### Font Family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, sans-serif
```

### Font Sizes

```css
text-xs   : 12px / 1rem    - Labels, small metadata
text-sm   : 14px / 1.25rem - Body text, buttons
text-base : 16px / 1.5rem  - Standard body
text-lg   : 18px / 1.75rem - Subsection headers
text-xl   : 20px / 1.75rem - Section titles
text-2xl  : 24px / 2rem    - Large values, modal headers
text-3xl  : 30px / 2.25rem - Page headers
```

### Font Weights

```css
font-medium   : 500 - Body text
font-semibold : 600 - Navigation, buttons
font-bold     : 700 - Section headers, important labels
font-black    : 900 - Page titles, stat values
```

### Usage Examples

**Page Header**
```tsx
<h1 className="text-3xl font-black text-gray-900">
  Dashboard Overview
</h1>
```

**Section Title**
```tsx
<h2 className="text-xl font-bold text-gray-900">
  Recent Orders
</h2>
```

**Body Text**
```tsx
<p className="text-sm text-gray-600">
  Description text here
</p>
```

**Stat Value**
```tsx
<p className="text-2xl font-black text-gray-900">
  £125,430
</p>
```

---

## 🔘 Border Radius

### Radius Scale
```css
rounded-lg   : 8px  - Small elements
rounded-xl   : 12px - Buttons, inputs, small cards
rounded-2xl  : 16px - Cards, modals, major containers
rounded-3xl  : 24px - Login screen
rounded-full : 9999px - Badges, avatars, pills
```

### Usage Guidelines

**Cards & Containers**
```tsx
<div className="rounded-2xl">
  // 16px corner radius
</div>
```

**Buttons & Inputs**
```tsx
<button className="rounded-xl">
  // 12px corner radius
</button>
```

**Status Badges**
```tsx
<span className="rounded-full">
  // Fully rounded pill shape
</span>
```

---

## 🌈 Shadows

### Shadow Hierarchy

**Elevation 1 - Subtle (Cards)**
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
```

**Elevation 2 - Medium (Hover states)**
```css
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
```

**Elevation 3 - High (Modals, dropdowns)**
```css
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

**Elevation 4 - Maximum (Login screen)**
```css
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Custom Shadows

**Gradient Icon Shadow**
```tsx
<div className="shadow-lg shadow-purple-200">
  // Colored shadow for depth
</div>
```

---

## 🎭 Component Anatomy

### Stat Card

```tsx
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
  {/* Icon with gradient background */}
  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
    <DollarSign size={24} className="text-white" />
  </div>
  
  {/* Trend indicator */}
  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700">
    <TrendingUp size={14} />
    12.5%
  </div>
  
  {/* Label */}
  <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
  
  {/* Value */}
  <p className="text-3xl font-black text-gray-900">£125,430</p>
</div>
```

### Status Badge

```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
  <CheckCircle2 size={12} />
  DELIVERED
</span>
```

### Button (Primary)

```tsx
<button className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02] transition-all">
  Save Changes
</button>
```

### Input Field

```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Email Address <span className="text-red-500">*</span>
  </label>
  <input
    type="email"
    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
  />
</div>
```

---

## 🎬 Animations & Transitions

### Transition Classes

**All Properties**
```tsx
className="transition-all duration-200"
```

**Colors Only (faster)**
```tsx
className="transition-colors duration-150"
```

**Transform & Opacity**
```tsx
className="transition-transform duration-200"
```

### Common Animations

**Button Hover (Scale)**
```tsx
className="hover:scale-[1.02] transition-transform"
```

**Button Hover (Shadow)**
```tsx
className="hover:shadow-lg transition-shadow"
```

**Card Hover**
```tsx
className="hover:shadow-md transition-shadow"
```

**Link Hover (Color)**
```tsx
className="hover:text-purple-600 transition-colors"
```

**Sidebar Expand/Collapse**
```tsx
className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
```

---

## 📱 Responsive Breakpoints

### Breakpoint System

```css
/* Mobile First Approach */
Base (default) : 0px - 639px   (all devices)
sm:            : 640px+        (large phones)
md:            : 768px+        (tablets)
lg:            : 1024px+       (laptops, sidebar appears)
xl:            : 1280px+       (desktops)
2xl:           : 1536px+       (large screens)
```

### Common Responsive Patterns

**Stats Grid**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  // 1 col → 2 cols → 4 cols
</div>
```

**Sidebar Visibility**
```tsx
<aside className="hidden lg:flex">
  // Hidden on mobile, visible desktop
</aside>
```

**Conditional Padding**
```tsx
<main className="p-4 lg:p-6">
  // 16px mobile, 24px desktop
</main>
```

**Text Size Scaling**
```tsx
<h1 className="text-2xl lg:text-3xl">
  // Smaller on mobile, larger on desktop
</h1>
```

---

## ✨ Interactive States

### Hover States

**Sidebar Link**
```css
Inactive: rgba(255,255,255,0.6)
Hover:    rgba(255,255,255,1) + bg-white/5
Active:   gradient + white + shadow
```

**Button**
```css
Default: gradient background
Hover:   shadow-lg + scale-[1.02]
Active:  scale-[0.98]
```

**Table Row**
```css
Default: white
Hover:   bg-gray-50
```

### Focus States

**Input**
```css
Default:  border-gray-200
Focus:    ring-2 ring-purple-500 + border-transparent
```

**Button**
```css
Focus: outline-offset-2 outline-purple-500
```

### Active States

**Sidebar Link**
- Gradient background
- White text
- Dot indicator (right side)
- Shadow effect

**Tab/Selection**
- Border bottom accent
- Text color change
- Background highlight

---

## 🎯 Icon System

### Icon Library
Using **Lucide React** - https://lucide.dev

### Icon Sizes
```tsx
size={12} - Tiny (badges, inline)
size={14} - Small (compact UI)
size={16} - Default (most cases)
size={18} - Medium (sidebar, buttons)
size={20} - Large (header)
size={24} - X-Large (stat cards)
```

### Icon Colors
- Primary text: `text-gray-700`
- Secondary: `text-gray-500`
- Active: `text-white`
- Brand: `text-purple-600`
- Status-based: `text-green-600`, `text-red-600`, etc.

### Common Icons
```tsx
// Navigation
<LayoutDashboard /> - Dashboard
<Package />         - Products
<ShoppingCart />    - Orders
<Users />           - Customers
<Settings />        - Settings

// Actions
<Plus />     - Add/Create
<Edit2 />    - Edit
<Trash2 />   - Delete
<Eye />      - View
<Download /> - Export

// Status
<CheckCircle2 /> - Success
<XCircle />      - Error
<Clock />        - Pending
<AlertCircle />  - Warning
```

---

## 📋 Component Checklist

### Every Component Should Have:
- [ ] Consistent border radius (rounded-xl or rounded-2xl)
- [ ] Proper spacing (p-4, p-6, or logical padding)
- [ ] Hover state (where applicable)
- [ ] Focus state (for interactive elements)
- [ ] Responsive behavior (mobile to desktop)
- [ ] Accessible contrast ratios (WCAG AA)
- [ ] Loading state (if data-driven)
- [ ] Empty state (if list/table)
- [ ] Error state (if can fail)

---

## 🎨 Design Tokens (Quick Reference)

```tsx
// Colors
const colors = {
  brand: {
    purple: '#3D1A6E',
    pink: '#E91E8C',
    gradient: 'from-purple-600 to-pink-600'
  },
  status: {
    success: 'green-600',
    warning: 'yellow-600',
    error: 'red-600',
    info: 'blue-600'
  }
}

// Spacing
const spacing = {
  page: 'p-4 lg:p-6',
  card: 'p-6',
  section: 'space-y-6',
  grid: 'gap-6'
}

// Radius
const radius = {
  card: 'rounded-2xl',
  button: 'rounded-xl',
  badge: 'rounded-full'
}

// Typography
const text = {
  pageHeader: 'text-3xl font-black',
  sectionHeader: 'text-xl font-bold',
  body: 'text-sm text-gray-600',
  statValue: 'text-2xl font-black'
}
```

---

## 🚀 Best Practices

### Do's ✅
- Use consistent spacing (multiples of 4px)
- Apply hover states to interactive elements
- Use semantic color coding
- Provide visual feedback on actions
- Test on mobile devices
- Use loading spinners for async actions
- Show empty states with helpful messages
- Use icons to enhance understanding

### Don'ts ❌
- Don't mix border radius sizes arbitrarily
- Don't use too many colors
- Don't neglect empty/error states
- Don't forget mobile responsiveness
- Don't use tiny hit targets (<44px)
- Don't overcomplicate layouts
- Don't ignore accessibility
- Don't skip hover/focus states

---

**Design System Version:** 2.0.0  
**Last Updated:** 2025  
**Maintained by:** Life Box Development Team
