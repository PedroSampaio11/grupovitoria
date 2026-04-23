# Vitória Transportes - Projeto Web

Este é o repositório central da **Vitória Transportes**, organizado para máxima escalabilidade e performance.

## 🏗️ Arquitetura (Enterprise Agentic)

- **`agents/`**: Squads da FourCoders responsáveis pela construção e manutenção.
  - `squads/tech/`: Agentes especialistas em Produto, UX, Dev e QA.
  - `shared/`: Bases de conhecimento de design (UI/UX Pro Max, Anthropic).
- **`apps/vitoria-web/`**: Aplicação Next.js (App Router, TS, Tailwind).
- **`docs/`**: Documentação de requisitos, branding e aprendizados.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript.
- **Styling**: Tailwind CSS + Shadcn/UI.
- **Inteligência**: CrewAI + Sandeco Prompt Techniques.
- **SEO**: Next.js Metadata API + JSON-LD Schema.
- **Performance**: Mobile-first, Core Web Vitals optimized.

## 🛠️ Comandos

- Agentes: `py agents/squads/main_tech.py`
- Web: `cd apps/vitoria-web && npm run dev`
