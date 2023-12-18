# xpress (An Express.js template)

## Folders inside `src`

- cli
  - with `npm run g --name` script, you can generate necessary files for `API`. You can adjust this functionality from this folder.
- config
  - `app.config.ts` (Configuration file for Express App)
  - `db.config.ts` (Configuration file for Mongoose Database)
  - `env.config.ts` (Configuration file Environment variables)
  - `logger.config.ts` (Configuration file Winston logger)
- constants
  - `Constants.ts` (Main constants file, usually for DEFAULT values)
  - `Roles.ts` (For User auth roles)
  - `StatusCodes.ts` (For HTTP Status codes)
- controllers
  - API Controllers. Create Request Handler functions and export them inside an object
- dtos
  - DTO files (With `zod`)
- errors
  - Custom HTTP Error Classes
- interfaces
  - DB Model interfaces for Mongoose
- middlewares
  - API Middlewares
- models
  - MongoDB models
- routes
  - API Routes. See `route` function
- services
  - API Services
- types
  - Type files (ending in .t.ts)
- utils
  - Utility files
- `index.ts` (Entry file)