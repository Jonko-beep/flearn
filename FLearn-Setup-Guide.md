# FLearn — Project Setup Guide

## What You'll Set Up
- A `FLearn` project folder on your MacBook
- A GitHub repository to sync between your MacBook and Windows machine
- Claude Code on both machines

---

## Part 1: Create Your Project Folder (MacBook)

1. Open **Finder**
2. Go to your **Documents** folder (or Desktop — wherever you want the project to live)
3. Right-click → **New Folder** → name it `FLearn`
4. Move your two `.jsx` files from Downloads into the `FLearn` folder:
   - `finance-learn-prototype.jsx`
   - `interactive-lesson-demo.jsx`

---

## Part 2: Install Git (If You Don't Have It)

### MacBook
1. Open **Terminal** (search "Terminal" in Spotlight)
2. Type `git --version` and press Enter
3. If Git is installed, you'll see a version number — you're good
4. If not, macOS will prompt you to install Command Line Tools — click **Install** and follow the prompts

### Windows
1. Download Git for Windows from: https://git-scm.com/download/win
2. Run the installer — use all the **default options**
3. Once installed, open **PowerShell** or **Command Prompt**
4. Type `git --version` to confirm it worked

---

## Part 3: Set Up GitHub Repository

### On GitHub (in your browser)
1. Go to https://github.com and sign in to your account (Jonko-beep)
2. Click the **+** icon in the top-right → **New repository**
3. Repository name: `FLearn`
4. Description: `Financial literacy learning platform`
5. Choose **Private** (you can make it public later if you want)
6. Do NOT check "Add a README file" (we'll create one locally)
7. Click **Create repository**
8. You'll see a page with setup instructions — keep this page open, you'll need the URL

### On Your MacBook (Terminal)
1. Open **Terminal**
2. Navigate to your FLearn folder:
   ```
   cd ~/Documents/FLearn
   ```
   (Adjust the path if you put it somewhere else)

3. Set up your Git identity (one-time setup):
   ```
   git config --global user.name "Jonko-beep"
   git config --global user.email "your-email@example.com"
   ```
   (Use the email associated with your GitHub account)

4. Initialize Git and push to GitHub:
   ```
   git init
   git add .
   git commit -m "Initial commit - FLearn lesson plans"
   git branch -M main
   git remote add origin https://github.com/Jonko-beep/FLearn.git
   git push -u origin main
   ```

5. GitHub will ask you to authenticate. You have two options:
   - **Browser sign-in**: GitHub may open your browser to sign in
   - **Personal Access Token**: If prompted for a password, you'll need a token instead. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Generate New Token. Copy the token and paste it as your password.

6. Refresh your GitHub page — you should see your files!

---

## Part 4: Clone the Repo on Your Windows Machine

1. Open **PowerShell** or **Command Prompt**
2. Navigate to where you want the project:
   ```
   cd Documents
   ```
3. Clone your repo:
   ```
   git clone https://github.com/Jonko-beep/FLearn.git
   ```
4. This creates a `FLearn` folder with all your files inside

---

## Part 5: Install Claude Code (Both Machines)

### Option A: Desktop App (Easiest)
1. Go to https://claude.ai/download
2. Download the app for your platform (macOS or Windows)
3. Install and sign in with your Claude Pro account
4. Click the **Code** tab to start using Claude Code

### Option B: Native Installer (Terminal)

**MacBook:**
```
curl -fsSL https://claude.ai/install.sh | sh
```

**Windows (PowerShell):**
Visit https://code.claude.com/docs/en/setup for the current Windows install command.

---

## Part 6: Daily Workflow (Syncing Between Machines)

### When you FINISH working on a machine:
```
git add .
git commit -m "Brief description of what you changed"
git push
```

### When you START working on the other machine:
```
cd Documents/FLearn
git pull
```

### Using Claude Code to handle Git for you:
Once Claude Code is open in your FLearn folder, you can just say:
- "Commit my changes with a descriptive message and push to GitHub"
- "Pull the latest changes"
- "Show me what files have changed"

Claude Code handles the Git commands for you.

---

## Part 7: First Thing to Do in Claude Code

Once Claude Code is set up and pointed at your FLearn folder, type:

```
/init
```

This generates a `CLAUDE.md` file that helps Claude Code understand your project structure. It will analyze your files and create a guide for itself about your codebase.

---

## Quick Reference

| Task | Command |
|------|---------|
| Check Git is installed | `git --version` |
| See what files changed | `git status` |
| Save your changes | `git add .` then `git commit -m "message"` |
| Push to GitHub | `git push` |
| Pull latest from GitHub | `git pull` |
| Start Claude Code | `claude` (terminal) or open Desktop app |
| Generate project config | `/init` (inside Claude Code) |

---

## Troubleshooting

**"Permission denied" when pushing to GitHub**
→ You need to authenticate. Set up a Personal Access Token on GitHub (Settings → Developer Settings → Personal Access Tokens)

**"fatal: not a git repository"**
→ Make sure you're inside the FLearn folder when running Git commands. Use `cd Documents/FLearn` first.

**Files out of sync between machines**
→ Always `git pull` before starting work, and `git push` when you're done. If you get a merge conflict, Claude Code can help you resolve it — just ask.
