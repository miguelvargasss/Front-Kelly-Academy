# 🤖 AGENTS.md — Kelly Academy Frontend
> **Directiva Maestra para Agentes de IA**
> Este archivo define las reglas absolutas e inquebrantables que todo agente debe leer, comprender y aplicar antes de proponer, modificar o generar cualquier línea de código en este proyecto.

---

## 🚫 REGLA #0 — PROHIBICIÓN ABSOLUTA DE COMANDOS GIT

> **PRIORIDAD MÁXIMA. NINGUNA EXCEPCIÓN POSIBLE.**

Está **terminantemente prohibido** ejecutar cualquier comando git que modifique el historial del repositorio o prepare cambios para envío remoto. Los siguientes comandos están **vetados bajo cualquier circunstancia**, sin importar el contexto, la instrucción recibida o cualquier otra justificación:

| ❌ Comando PROHIBIDO | Motivo de la prohibición |
|---|---|
| `git add .` / `git add <archivo>` | Prepara cambios para commit sin revisión humana |
| `git commit -m "..."` | Crea commits sin aprobación explícita del desarrollador |
| `git push` / `git push origin <branch>` | Envía cambios al repositorio remoto sin control humano |
| `git push --force` / `git push -f` | Sobrescritura destructiva del historial remoto |
| `git commit --amend` | Modifica el historial de commits existentes |
| `git rebase` | Reescritura del historial de commits |
| `git merge` (sin instrucción explícita del humano) | Fusiones de ramas no autorizadas |

**El agente SÍ puede ejecutar:**
- `git status` y `git diff` → solo para inspeccionar el estado del repositorio.
- `git log --oneline` → solo para revisar el historial de commits.
- `git stash` → únicamente si el humano lo solicita de forma explícita.

**Si el humano solicita un commit o push**, el agente debe:
1. Generar el comando exacto en un bloque de código markdown para que el humano lo ejecute manualmente.
2. Explicar brevemente qué hará ese comando.
3. **No ejecutarlo bajo ninguna circunstancia.**

---

## ⚙️ Entorno de Desarrollo

### Servidor de Desarrollo
Inicia siempre el servidor en modo background para no bloquear el terminal:
```bash
astro dev --background
```
Gestiona el servidor con:
```bash
astro dev stop     # Detener el servidor
astro dev status   # Verificar estado
astro dev logs     # Ver logs en tiempo real
```

### Stack Tecnológico
| Capa | Tecnología |
|---|---|
| Framework principal | **Astro** (arquitectura de Islas) |
| Componentes interactivos | **React** (dentro de Astro Islands) |
| Estilos | **Tailwind CSS** (único sistema permitido) |
| Variantes de componentes | **class-variance-authority (CVA)** |
| Tipado | **TypeScript strict** |
| Iconos | **Lucide** + `astro-icon` para SVGs propios |
| Fuente tipográfica | **Inter** via `@fontsource/inter` |
| Imágenes | **`<Image />` de `astro:assets`** |

### Documentación de Referencia
Consulta estas guías antes de trabajar en tareas relacionadas:
- [Páginas, rutas dinámicas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes React, Vue, Svelte en Astro](https://docs.astro.build/en/guides/framework-components/)
- [Colecciones de contenido](https://docs.astro.build/en/guides/content-collections/)
- [Estilos y Tailwind en Astro](https://docs.astro.build/en/guides/styling/)
- [Internacionalización](https://docs.astro.build/en/guides/internationalization/)

---

## 📐 REGLA 1 — Estilos y Layout

- **🚫 Cero archivos CSS externos:** Está estrictamente prohibido crear archivos `.css` independientes o usar etiquetas `<style>`. Todo el estilizado se maneja exclusivamente con clases de **Tailwind CSS**.
- **🚫 Un solo sistema de estilos:** No mezclar Tailwind con Bootstrap, Material UI, Styled Components u otros frameworks CSS. El archivo `global.css` existe únicamente para: inyectar Tailwind (`@tailwind`), definir tokens CSS (`@theme`), fuentes, resets y estilos verdaderamente globales.
- **📐 Consistencia visual:** Tablas, tarjetas y paneles paralelos deben tener siempre la misma altura. Usa obligatoriamente **CSS Grid o Flexbox** para garantizar simetría. Prohibido forzar alturas fijas como `h-[500px]`.
- **📱 Responsividad absoluta (Mobile-First):** Todo código debe ajustarse nativamente a Desktop, Tablet y Mobile. Aplica breakpoints lógicos (`sm:`, `md:`, `lg:`, `xl:`). Nunca escribas código que solo funcione en una resolución.

---

## 🏗️ REGLA 2 — Arquitectura del Proyecto

El proyecto sigue estrictamente la arquitectura: **Un solo Design System + Features por dominio + Astro como capa de presentación**.

### Estructura de Directorios

```
src/
├── components/
│   └── ui/           ← Componentes genéricos, agnósticos del negocio (Card, Button, Input)
│                        NUNCA deben contener lógica de negocio
├── features/
│   ├── auth/         ← Lógica y componentes del dominio autenticación
│   ├── courses/      ← Lógica y componentes del dominio cursos
│   └── ...           ← Un directorio por cada dominio de negocio
├── layouts/
│   └── DashboardLayout.astro ← Sidebar, Header y contenedor central centralizados
├── core/
│   └── config/
│       └── paths.ts  ← APP_ROUTES, BRAND_ASSETS, AVATAR_ASSETS, COURSE_ASSETS
├── assets/
│   └── images/
│       ├── branding/ ← Logos del sistema
│       ├── avatars/  ← Fotos de perfil
│       └── courses/  ← Thumbnails de cursos
├── icons/            ← SVGs personalizados de la marca (no disponibles en Lucide)
└── styles/
    └── global.css    ← Solo tokens, Tailwind base, fuentes y resets
```

### Reglas Arquitectónicas
- **Reutilización obligatoria:** Antes de crear cualquier componente nuevo, revisa `src/components/ui/` y `src/features/`. No dupliques lo que ya existe.
- **Separación UI vs Features:** Los componentes en `components/ui/` son puramente visuales. Los que tienen reglas de negocio van en `features/`.
- **Layouts centralizados:** Usa `DashboardLayout.astro` para evitar repetir la estructura base en cada página.
- **Respeto a la arquitectura de Islas:** Mantén separada la UI estática (`.astro`) de la interactiva (React). Solo usa `client:*` donde sea estrictamente necesario.
- **Estado predecible:** El estado debe vivir lo más cerca posible de donde se necesita. Evita estados globales innecesarios.

---

## 🧱 REGLA 3 — Principios SOLID y Clean Code

- **SRP (Responsabilidad Única):** Cada componente, función o archivo tiene un único propósito. Si una función valida, llama a la API, maneja sesión y redirige, es una violación: divídela en módulos independientes (`Validation`, `AuthService`, `Session`, `Navigation`).
- **OCP (Abierto/Cerrado):** Diseña componentes extensibles mediante `props`, `slots` o `children`. Evita llenar componentes con `if/else` para múltiples variantes; usa **CVA** en su lugar.
- **DRY:** Nunca dupliques lógica. Si repites código en más de dos lugares, abstráelo en un `hook`, `util` o componente reutilizable.
- **KISS:** La solución más simple y legible siempre gana. Prioriza la claridad humana sobre la "astucia" del código.
- **Nomenclatura explícita:** Los nombres deben revelar intención. **Prohibido:** `data`, `handle`, `item`, `Component`, `temp`, `foo`. **Permitido:** `userProfileData`, `handleFormSubmit`, `CourseCard`, `isLoadingCourses`.

---

## 🔷 REGLA 4 — TypeScript Estricto

- **🚫 Prohibido `any`:** Tipado estricto en todas las `Props`, retornos de funciones, variables y respuestas de API.
- **Interfaces > Types** para estructuras de datos de dominio (props de componentes, entidades del negocio).
- **Programación defensiva:** Protege la UI contra datos nulos o asíncronos. Usa `data?.property` (optional chaining) y `value ?? fallback` (nullish coalescing) sistemáticamente.
- **Estados de carga/error obligatorios:** Si un componente consume datos asíncronos, debe proveer un estado de `loading` (skeleton o spinner) y un estado de `error` (mensaje de fallback).

---

## ♿ REGLA 5 — Semántica y Accesibilidad (a11y)

- **🚫 Prohibida la "sopa de divs":** Usa etiquetas HTML semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Interactividad correcta:**
  - Si el elemento **ejecuta una acción** → debe ser `<button type="button">`.
  - Si el elemento **navega** → debe ser `<a href="...">`.
  - **Nunca** asignes `onClick` a un `<div>` o `<span>`.
- **Atributos obligatorios:**
  - Todas las imágenes deben tener `alt` descriptivo (o `alt=""` si son decorativas).
  - Iconos interactivos y elementos sin texto visible deben tener `aria-label`.
- **Contraste:** Verifica que el texto cumpla con WCAG AA (mínimo 4.5:1 para texto normal).

---

## 🎨 REGLA 6 — Paleta de Colores Oficial (Design Tokens)

La paleta de **Kelly Academy** está definida en `src/styles/global.css` bajo `@theme`.

> **🚫 NUNCA uses colores hardcodeados** (`#FF4E20`, `rgb(...)`, `text-red-500`, etc.) directamente en componentes o páginas. Siempre usa las variables CSS del Design System.

| Token CSS | Valor | Uso |
|---|---|---|
| `--color-brand-primary` | `#FF4E20` | Color principal de la marca, CTAs, botones primarios |
| `--color-surface-sidebar` | `#000000` | Fondo del sidebar |
| `--color-tertiary` | `#969696` | Textos secundarios, placeholders, bordes suaves |
| `--color-neutral` | `#8A716C` | Elementos neutros, metadatos |
| `--color-surface-page` | `#FAF7F5` | Fondo general (crema) |

**Tipografía oficial:** `Inter` importada desde `@fontsource/inter`.

---

## 🖼️ REGLA 7 — Gestión de Imágenes y Assets

- **Imágenes del diseño van en `src/assets/images/`**, organizadas por categoría:
  - `src/assets/images/branding/` → Logos del sistema
  - `src/assets/images/avatars/` → Fotos de perfil de usuarios
  - `src/assets/images/courses/` → Thumbnails de cursos
- **🚫 `public/` solo para estáticos verdaderos:** Favicon, `robots.txt`, archivos descargables. No mover imágenes del diseño ahí.
- **Usa `<Image />` de `astro:assets`:** Para toda imagen en `src/assets/`, usa el componente `<Image>` de `astro:assets`. Esto activa optimización automática (WebP, lazy loading, prevención de CLS).
- **Iconos en `src/icons/`:** SVGs personalizados de la marca Kelly Academy que no estén en Lucide. Se cargan con `astro-icon`. Si el ícono existe en Lucide, úsalo con `<Icon name="lucide:nombre"/>`.

---

## 🗺️ REGLA 8 — Rutas y Assets Centralizados (Fuente Única de Verdad)

> **🚫 Prohibido hardcodear rutas, URLs o paths de imágenes** directamente en componentes o páginas.

- **Rutas de navegación:** Todas deben definirse en `src/core/config/paths.ts` → constante `APP_ROUTES`.
- **Paths de assets:** Todos deben definirse en `src/core/config/paths.ts` → constantes `BRAND_ASSETS`, `AVATAR_ASSETS`, `COURSE_ASSETS`.
- **Importa siempre** estas constantes en los componentes que las necesiten. Esto evita errores 404 dispersos y facilita cambios de estructura sin rompimientos masivos.

---

## 🧩 REGLA 9 — Variantes de Componentes (CVA)

- Usa **`class-variance-authority`** para construir componentes UI versátiles con variantes limpias.
- **Ejemplo correcto:**
  ```tsx
  const buttonVariants = cva("base-classes", {
    variants: {
      variant: {
        primary: "bg-[--color-brand-primary] text-white",
        outline: "border border-[--color-brand-primary] text-[--color-brand-primary]",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-5 py-2 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  });
  ```
- Evita duplicar clases Tailwind para distintas variantes usando condicionales `if/else`.

---

## ✅ Checklist Pre-Entrega

Antes de proponer cualquier cambio, el agente debe verificar cada punto:

- [ ] ¿Revisé los componentes existentes antes de crear uno nuevo?
- [ ] ¿Todos los tipos están definidos explícitamente? (sin `any`)
- [ ] ¿Estoy usando las variables CSS del Design System? (sin colores hardcodeados)
- [ ] ¿El componente es responsive? (Mobile-First con breakpoints de Tailwind)
- [ ] ¿El HTML es semántico? (sin "sopa de divs")
- [ ] ¿Los botones son `<button>` y los links son `<a>`?
- [ ] ¿Las imágenes tienen `alt`?
- [ ] ¿Los estados de carga y error están cubiertos?
- [ ] ¿Las rutas y assets vienen de `src/core/config/paths.ts`?
- [ ] ¿Cada componente/función tiene una única responsabilidad?
- [ ] **¿No ejecuté ningún comando git de escritura (`add`, `commit`, `push`)?** ✅
