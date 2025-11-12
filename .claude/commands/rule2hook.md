#

# Task: Convert Project Rules to Claude Code Hooks (v2.0)

#

# This command is the "Framework Compliance Engine".

# It reads the CLAUDE.md v2.0 and generates the .claude/settings.json

# to enforce the project's rules automatically.

#

You are an expert at converting natural language project rules, extracted from our `CLAUDE.md v2.0`, into Claude Code hook configurations.

## Instructions v2.0 (REFACTORED)

1.  **Read `CLAUDE.md`:** Read the `./CLAUDE.md` file (project memory).
2.  **Parse v2.0 Structure:** You MUST parse _both_ types of content:
    - **Strategic Sections (`[ini]` style):**
      - `[stack].language` (e.g., "TypeScript", "Python")
      - `[stack].framework`
      - `[methodology].vcs_provider`
    - **Technical & Rules Sections (`## Markdown` style):**
      - `## Development Commands` (to find the _actual_ test and lint commands)
      - `## Testing Requirements` (e.g., "NO EXCEPTIONS POLICY")
      - `## Code Writing Standards` (e.g., "ABOUTME: prefix")
3.  **Apply Generation Logic (See Below):** Intelligently map these rules to hooks.
4.  **Generate JSON:** Generate the complete hook configuration in the exact JSON structure.
5.  **Save to Settings:** Save the configuration to `.claude/settings.json` (merging with existing hooks).
6.  **Provide Summary:** Report back to Daniel with a summary of the hooks configured.

## Hook Events (Quick Reference)

- **`PreToolUse`:** Runs _BEFORE_ a tool. Use to block actions (e.g., block a `git commit` if tests fail).
- **`PostToolUse`:** Runs _AFTER_ a tool. Use for cleanup (e.g., run a formatter after a file is `Write`).
- **`Stop`:** Runs when Claude finishes responding.

## Lógica de Generación de Hooks v2.0 (REFACTORED)

You must translate the high-level rules into specific, automated hooks.

---

**Regla de Ejemplo 1: Formateo de Código**

- **`CLAUDE.md` dice:** `[stack].language = "TypeScript"` y `## Development Commands` lista `lint: "prettier --write ."`
- **Tu Lógica:** "El stack es TypeScript. Encontré el comando de lint. Crearé un hook `PostToolUse` para ejecutar `prettier --write` (o el linter/formateador relevante) cada vez que se usen las herramientas `Write` o `Edit`, para mantener el código formateado automáticamente."
- **Hook Resultante:**
  ```json
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "yarn lint --quiet || true"
    }]
  }]
  ```

---

**Regla de Ejemplo 2: Pruebas Obligatorias (NO EXCEPTIONS)**

- **`CLAUDE.md` dice:** `## Testing Requirements` tiene "NO EXCEPTIONS POLICY" y `## Development Commands` lista `test: "vitest run"`
- **Tu Lógica:** "La política de 'No Excepciones' es crítica. Debo _bloquear_ los commits si las pruebas fallan. Crearé un hook `PreToolUse` en la herramienta `Bash`. Este hook inspeccionará el comando de Bash. Si el comando es `git commit` o `git push`, _primero_ ejecutaré el comando de prueba (`yarn test`). Si `yarn test` falla (exit code no-cero), el hook fallará, bloqueando el commit."
- **Hook Resultante:**
  ```json
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "command",
      "command": "if [[ \"$BASH_COMMAND\" == *\"git commit\"* || \"$BASH_COMMAND\" == *\"git push\"* ]]; then echo 'Running pre-commit tests (NO EXCEPTIONS policy)...'; yarn test; else true; fi"
    }]
  }]
  ```

---

**Regla de Ejemplo 3: Cumplimiento de Estándares (ABOUTME)**

- **`CLAUDE.md` dice:** `## Code Writing Standards` tiene "All code files MUST start with... 'ABOUTME: '".
- **Tu Lógica:** "Debo verificar esto _antes_ de que un archivo se guarde. Crearé un hook `PreToolUse` en las herramientas `Write` y `Edit`. El hook ejecutará un script de `grep` para verificar el encabezado 'ABOUTME:'. Si falta, el hook fallará, bloqueando el guardado y forzando al agente a cumplir la regla."
- **Hook Resultante:**
  ```json
  "PreToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "grep -q 'ABOUTME:' $FILE_PATH || (echo 'Error: File MUST start with ABOUTME: header.' && exit 1)"
    }]
  }]
  ```

---

## Best Practices

1.  **Error Handling**: Add `|| true` to _non-blocking_ `PostToolUse` commands.
2.  **Blocking Hooks**: _Intentionally_ omit `|| true` on `PreToolUse` commands that are meant to fail (like the Testing and ABOUTME rules).
3.  **Quiet Mode**: Use quiet flags (`--quiet`, `-q`) to avoid cluttering the chat.

## User Input

$ARGUMENTS
