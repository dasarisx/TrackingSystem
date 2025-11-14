# API Routes

## Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

## Resume (protected, requires Bearer token)
- `POST /api/resumes` — Create a new resume
- `GET /api/resumes` — Get all resumes for the authenticated user
- `PUT /api/resumes/:id` — Update a resume by ID
- `DELETE /api/resumes/:id` — Delete a resume by ID

## (Planned/Extendable)
- Achievements and other resume sections can be managed via additional endpoints in the future.
