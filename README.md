# SnipURL
It is Full Stack URL shortener web app created using React JS, Supabase, Tailwind CSS and Shadcn UI.

## Features
- [x] 🔐User Authentication using supabase as backend service.
- [x] 💻Simple and sleek dashborad where you can see your all URLs with QR code which redirects to original link.
- [x] 💹Analytics for URLs contains Clicks on URL, Location graph of clicks and Device info. 

### Libraries Used
- Install **shadcn ui library**.
- Setup **Supabase** for backend service. 
    1. Use github login -> create a new project.
    2. Create .env file, add VITE_SUPABASE_URL , VITE_SUPABASE_KEY.
    3. To connect react app with supabase `connect` -> `App Framework` select React and Vite -> Copy the given code from `utils/supabase.ts`.
    4. Create a `src/db/supabase.js` file and paste the copied code. 
    5. Create tables.
- Install react router dom library.
- Install **yup** library for input validation and **react-spinners** for loading spinner. 
- Using **react-qrcode-logo** to generate QR code.
- Install **ua-parser-js** it is used to detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data
- For Line graph and pie chart we are using **recharts** library



