## Source code

- Backend : Node.js、Express、MongoDB
- Frontend: Vite、React、Typescript、TailwindCSS

---

## How to start the project ?

### Step 0: Setting the MongoDB 
[Backend and DB setting tutorials](https://github.com/ChenTim1011/HappyNotes/tree/main/src/backend)


### Step 1: Navigate to the `src` Directory

Make sure you are in the `FinalCloud/src` directory:

```bash
cd FinalCloud/src
```

### Step 2: Install Dependencies

Install the dependencies for both backend and frontend:

```bash
# Install src dependencies, backend , and frontend dependencies.
npm install && npm install --prefix backend && npm install --prefix frontend/react-frontend
```

### Step 3: Start Both Services

In the  `FinalCloud/src` directory to start both backend and frontend:

```bash
npm start

- **Backend**: Uses PM2 to manage the backend app and the database.
- **Frontend**: Starts the Vite development server.

---

## Step 4: Stopping the Application

You have multiple options for stopping the services:

### Option 1: Using NPM Scripts

1. **Stop All Services**:

   ```bash
   npm run stop
   ```

If you only want to stop either frontend or backend part.

2. **Stop Backend Services**:

   ```bash
   npm run stop-backend
   ```

3. **Stop Frontend Service**:

     ```bash
     npm run stop-frontend
     ```

