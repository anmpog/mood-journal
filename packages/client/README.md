# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Scales

Scales should describe a range of some sort, and should be ordered such that
lower values should represent "less" and higher values should represent "more"
of whatever said scale is attempting to represent. Words should map to
numerical values. The lowest numerical value associated with a descriptive word
should be "1". So for example, a scale might be:

```ts
;[
  { descriptor: 'A little', value: 1 },
  { descriptor: 'Some', value: 2 },
  { descriptor: 'A Lot', value: 3 },
]
```

## Schemas

On the client, schema will refer to a Zod schema used specifically for
client-side validation.

## Formik Use

THe way that I'm using Formik in this case is a bit weird. I wanted to be able to create "subforms" that I could compose into one form. Doing so takes some finagling. I'm notating here so I don't completely forget my own approach to this. This pattern is not detailed in the Formik documentation.

To me, a "subform" represents a piece of UI that I want to control its own state, and then deliver that state to some parent to represent a value on the parent's state. My first use case was an "Add an Activity" feature that allows a user to add various activities to a Journal Entry. The Activity entries on the Journal Entry are optional, and as such the UI for adding an activity entry is not immediately visible to the user. Instead, the Activity entries are added to the Journal Entry via a dialog/modal. The modal behaves as a form, except that on "submission" of the form, the state of the modal is pushed up to the parent state.

As of writing this, I encapsulated the logic for doing this in a hook that is very specific to this particular use case. The hook in question (`useJournalActivities`) instantiates a Formik instance so that I have the ease of using controlled components in the modal that collects the information about an activity entry. The hook also accesses the parent form's context via the `useFormikContext` hook. This implies that the parent UI explicitly (or implicitly) provides a context for the child component to access. It is via the `useFormikContext` hook that I'm able to access and modify the state of the parent form via the provided helpers.
