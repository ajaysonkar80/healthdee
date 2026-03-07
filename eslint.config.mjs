import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import promise from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  ...nextVitals,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      promise,
      import: importPlugin
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

      /* ---------------- UNUSED CODE DISABLED ---------------- */

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      /* ---------------- PROMISE SAFETY ---------------- */

      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",
      "promise/no-return-wrap": "error",
      "promise/always-return": "off",

      /* ---------------- IMPORT RULE ---------------- */

      "import/no-self-import": "error",

      /* ---------------- LOGGING ---------------- */

      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  },

  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "tests/**/*.ts",
      "tests/**/*.tsx"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },

  {
    files: ["app/**/*.tsx", "components/**/*.tsx"],
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

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "scripts/**"
  ])
]);