import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([

  ...nextVitals,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      security,
      promise,
      import: importPlugin,
      "unused-imports": unusedImports
    },

    rules: {

      /* ---------------- REACT / NEXT ---------------- */

      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-html-link-for-pages": "error",

      /* ---------------- TYPESCRIPT SAFETY ---------------- */

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" }
      ],
      "@typescript-eslint/no-floating-promises": "off",

      /* ---------------- UNUSED IMPORTS ---------------- */

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      /* ---------------- SECURITY ---------------- */

      "security/detect-object-injection": "off",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-require": "warn",
      "security/detect-eval-with-expression": "error",

      /* ---------------- PROMISE SAFETY ---------------- */

      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",
      "promise/no-return-wrap": "error",
      "promise/always-return": "off",

      /* ---------------- IMPORT HYGIENE ---------------- */

      "import/no-cycle": "warn",
      "import/no-self-import": "error",

      /* ---------------- LOGGING ---------------- */

      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  },

  /* ---------------- TEST FILE OVERRIDE ---------------- */

  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "tests/**/*.ts",
      "tests/**/*.tsx",
      "**/**tests**/**/*.ts",
      "**/**tests**/**/*.tsx"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },

  /* ---------------- IMPORT RESTRICTIONS ---------------- */

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "drizzle-orm",
              message:
                "❌ Drizzle ORM must NOT be imported into Client Components. Use server-only files."
            },
            {
              name: "drizzle-orm/node-postgres",
              message:
                "❌ Drizzle DB adapters are server-only."
            },
            {
              name: "@/db",
              message:
                "❌ Database access is server-only. Do not import DB into client code."
            }
          ]
        }
      ]
    }
  },

  /* ---------------- GLOBAL IGNORES ---------------- */

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "scripts/wifi-network-warning.js",
    "scripts/**"
  ])

]);