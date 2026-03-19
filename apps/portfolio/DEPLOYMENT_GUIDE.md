# 🚀 Deployment Guide

Complete guide to deploy Abhishek's premium portfolio to the world.

## Option 1: GitHub Pages (Free + Automatic)

### Step 1: Push to GitHub

```bash
cd /workspace/apps/portfolio

# Initialize git repo if not already done
git init
git add .
git commit -m "feat: Initial portfolio setup"

# Create repo on GitHub and push
git remote add origin https://github.com/abhishekmadhur/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Select `main` branch and `/ (root)` directory
5. Click Save

### Step 3: Set Up Telegram Notifications (Optional)

1. Create a Telegram bot with [@BotFather](https://t.me/botfather)
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Go to GitHub repo → Settings → Secrets and variables → Actions
4. Add these secrets:
   - `TELEGRAM_TOKEN` - Your bot token
   - `TELEGRAM_TO` - Your chat ID

### Step 4: Deploy

```bash
git push origin main
```

GitHub Actions will automatically:
- ✅ Build the portfolio
- ✅ Run lint checks
- ✅ Deploy to GitHub Pages
- ✅ Send Telegram notification

Your portfolio will be live at: `https://abhishekmadhur.github.io`

## Option 2: Vercel (Recommended)

### Step 1: Push to GitHub

Same as Option 1, Step 1

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your portfolio repository
5. Click "Import"

### Step 3: Environment Variables (Optional)

Set these in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL` = your domain
- `TELEGRAM_BOT_TOKEN` = bot token (if using notifications)

### Step 4: Deploy

Click "Deploy" - Vercel will build and deploy automatically!

Your portfolio will be live at: `https://abhishekmadhur.vercel.app`

### Step 5: Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Your portfolio is now at your custom domain!

## Option 3: Self-Hosted (VPS/Server)

### Step 1: SSH into your server

```bash
ssh user@your-server.com
```

### Step 2: Install dependencies

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Clone repository

```bash
git clone https://github.com/abhishekmadhur/portfolio.git
cd portfolio
```

### Step 4: Install and build

```bash
npm install
npm run build
```

### Step 5: Set up PM2 (Process Manager)

```bash
sudo npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

### Step 6: Configure Nginx (Reverse Proxy)

```bash
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name abhishek.dev www.abhishek.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: SSL Certificate (HTTPS)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d abhishek.dev -d www.abhishek.dev
```

## Post-Deployment Checklist

- [ ] Portfolio loads without errors
- [ ] All links work correctly
- [ ] Mobile responsive design looks good
- [ ] Contact form sends messages
- [ ] Social links point to correct profiles
- [ ] SEO tags are correct
- [ ] Lighthouse score is 90+
- [ ] Google Analytics configured (optional)
- [ ] Sitemap.xml is generated
- [ ] robots.txt is accessible

## Performance Optimization

### Enable Caching

Add to your site headers:

```
Cache-Control: public, max-age=31536000
```

### Compress Assets

Next.js automatically compresses, but ensure:
- Images are optimized
- CSS is minified
- JS is code-split

### Monitor Performance

```bash
# Test with Lighthouse
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

### GitHub Actions Not Deploying

1. Check workflow file: `.github/workflows/deploy-portfolio.yml`
2. Verify secrets are set correctly
3. Check Actions tab for error logs

### Telegram Notifications Not Working

1. Verify bot token is correct
2. Verify chat ID is correct
3. Check GitHub Actions secrets
4. Look at workflow logs for errors

### Domain Not Pointing Correctly

1. Verify DNS records point to correct IP
2. Wait 24-48 hours for DNS propagation
3. Test with: `nslookup abhishek.dev`

## Updating Portfolio

### Make Changes Locally

```bash
git checkout -b feature/update-projects
# Edit components/Projects.tsx
git add .
git commit -m "feat: Update projects"
git push origin feature/update-projects
```

### Create Pull Request

1. Go to GitHub
2. Create Pull Request
3. Review changes
4. Merge to main

### Auto-Deploy

Once merged to main, GitHub Actions automatically deploys!

## Performance Metrics

Expected metrics after deployment:

- **Lighthouse Performance**: 95+
- **Lighthouse SEO**: 100
- **Lighthouse Accessibility**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Monitoring & Analytics

### Enable Google Analytics

1. Create GA4 property
2. Get your measurement ID
3. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX`} />
```

### Monitor Site Health

- Use Google Search Console
- Monitor Core Web Vitals
- Check error logs
- Track user behavior

## Support

Need help? Reach out:
- 📧 Email: contact@abhishek.dev
- 💬 Telegram: @abhishekmadhur
- 💼 LinkedIn: /in/abhishekmadhur
- 💻 GitHub: @abhishekmadhur

---

**Your premium portfolio is now live! 🎉**
