# 🔐 Paystack Payment Integration - Complete Setup Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Security Architecture](#security-architecture)
3. [Environment Setup](#environment-setup)
4. [Testing with Test Keys](#testing-with-test-keys)
5. [Production Deployment](#production-deployment)
6. [Webhook Setup (Optional)](#webhook-setup-optional)
7. [Troubleshooting](#troubleshooting)
8. [Security Checklist](#security-checklist)

---

## 🎯 Overview

This integration implements a secure payment flow using **Paystack** for the Healinton healthcare app. Key features:

- ✅ **PCI DSS Compliant** - No raw credit card data touches our servers
- ✅ **Server-Side Verification** - All payments verified via Paystack API
- ✅ **Free Trial Period** - All users get free access until January 1, 2026
- ✅ **Secure Key Management** - Public keys in client, secret keys server-side only
- ✅ **Idempotent Operations** - Duplicate verifications handled gracefully

---

## 🔒 Security Architecture

### Payment Flow Diagram

```
┌─────────────┐        ┌──────────────┐        ┌─────────────────┐
│   Browser   │        │   Paystack   │        │ Edge Function   │
│  (Client)   │        │   Checkout   │        │   (Server)      │
└──────┬──────┘        └──────┬───────┘        └────────┬────────┘
       │                      │                         │
       │ 1. Click Pay         │                         │
       ├─────────────────────>│                         │
       │                      │                         │
       │ 2. Secure Payment    │                         │
       │    Form (Hosted)     │                         │
       │<─────────────────────┤                         │
       │                      │                         │
       │ 3. User Enters Card  │                         │
       ├─────────────────────>│                         │
       │                      │                         │
       │                      │ 4. Process Payment      │
       │                      │    (Bank Network)       │
       │                      │                         │
       │ 5. Return Reference  │                         │
       │<─────────────────────┤                         │
       │                      │                         │
       │ 6. Verify Payment    │                         │
       ├─────────────────────────────────────────────────>│
       │    (reference + email)                        │
       │                      │                         │
       │                      │ 7. Verify with Paystack │
       │                      │<────────────────────────│
       │                      │    (SECRET KEY)         │
       │                      │                         │
       │                      │ 8. Confirmation         │
       │                      │─────────────────────────>│
       │                      │                         │
       │                      │ 9. Save to Database     │
       │                      │    + Activate Premium   │
       │                      │                         │
       │ 10. Success Response │                         │
       │<─────────────────────────────────────────────────┤
       │                      │                         │
```

### Key Security Principles

1. **Client Side (Browser)**
   - ✅ Uses `VITE_PAYSTACK_PUBLIC_KEY` (pk_test_... or pk_live_...)
   - ✅ Never handles credit card data directly
   - ✅ Only sends transaction reference for verification
   - ❌ No secret keys in client code

2. **Server Side (Edge Function)**
   - ✅ Uses `PAYSTACK_SECRET_KEY` (sk_test_... or sk_live_...)
   - ✅ Verifies payments with Paystack API
   - ✅ Uses `SUPABASE_SERVICE_ROLE_KEY` for database writes
   - ✅ Implements rate limiting (10 requests/minute)
   - ✅ Validates all inputs before processing

---

## ⚙️ Environment Setup

### Required Environment Variables

#### **Client-Side (.env file)**
```bash
# Paystack Public Key (SAFE to commit to Git if using .env.example)
# Test mode - use for development
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here

# Production mode - switch to this before going live
# VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here

# Supabase Configuration (already configured)
VITE_SUPABASE_URL=https://xuyioczahgozvdbfodht.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

#### **Server-Side (Supabase Edge Function Secrets)**
```bash
# Set these in Supabase Dashboard > Edge Functions > Secrets
# or via Supabase CLI

# Paystack Secret Key - NEVER commit to Git
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here  # For testing
# PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here  # For production

# Supabase keys (automatically available in edge functions)
SUPABASE_URL=https://xuyioczahgozvdbfodht.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### How to Set Edge Function Secrets

#### **Option 1: Supabase Dashboard (Recommended for Production)**
1. Go to https://supabase.com/dashboard/project/xuyioczahgozvdbfodht
2. Navigate to **Edge Functions** > **Secrets**
3. Click **Add Secret**
4. Name: `PAYSTACK_SECRET_KEY`
5. Value: Your Paystack secret key (sk_test_... or sk_live_...)
6. Click **Save**

#### **Option 2: Supabase CLI (Recommended for Development)**
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Set the secret
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here --project-ref xuyioczahgozvdbfodht
```

#### **Option 3: Using Lovable Interface**
Lovable should prompt you to add the secret when deploying. Follow the in-app instructions.

---

## 🧪 Testing with Test Keys

### Step 1: Get Paystack Test Keys

1. Sign up at https://paystack.com/signup
2. Go to **Settings** > **API Keys & Webhooks**
3. Copy your **Test Public Key** (pk_test_...)
4. Copy your **Test Secret Key** (sk_test_...)

### Step 2: Configure Test Keys

**Client (.env file):**
```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_test_key_here
```

**Server (Supabase Secrets):**
```bash
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_your_actual_test_key_here --project-ref xuyioczahgozvdbfodht
```

### Step 3: Test Payment Flow

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Navigate to Premium page:**
   - Go to http://localhost:5173/premium
   - Click "Get Premium" or "Subscribe Now"

3. **Initiate payment:**
   - Click the payment button
   - Paystack popup should appear

4. **Use Paystack test cards:**

   **Successful Payment:**
   ```
   Card Number: 4084 0840 8408 4081
   Expiry: Any future date (e.g., 12/25)
   CVV: Any 3 digits (e.g., 123)
   PIN: 0000
   OTP: 123456
   ```

   **Insufficient Funds:**
   ```
   Card Number: 5061 0105 1051 0510
   Expiry: Any future date
   CVV: Any 3 digits
   PIN: 0000
   ```

   **Declined Payment:**
   ```
   Card Number: 5060 9909 9000 0017
   Expiry: Any future date
   CVV: Any 3 digits
   ```

5. **Verify payment was recorded:**
   ```bash
   # Check payments table in Supabase
   # Go to: https://supabase.com/dashboard/project/xuyioczahgozvdbfodht/editor/payments
   
   # Or query via SQL:
   SELECT * FROM payments WHERE email = 'your_test_email@example.com' ORDER BY created_at DESC LIMIT 5;
   ```

6. **Check subscription activation:**
   ```bash
   # Check subscriptions table
   SELECT * FROM subscriptions WHERE user_id = 'your_user_id' AND status = 'active';
   ```

### Step 4: Test Edge Function Directly (Optional)

Test the verification endpoint using curl:

```bash
# Replace with an actual reference from a test payment
curl -X POST https://xuyioczahgozvdbfodht.supabase.co/functions/v1/verify-paystack-payment \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "healinton_1234567890_abc123",
    "email": "test@example.com",
    "amount": 500,
    "currency": "NGN"
  }'
```

**Expected responses:**

**Success (200):**
```json
{
  "success": true,
  "message": "Payment verified and subscription activated successfully",
  "payment_id": "uuid-here",
  "amount": 500,
  "currency": "NGN",
  "reference": "healinton_1234567890_abc123"
}
```

**Already Verified (200):**
```json
{
  "success": true,
  "message": "Payment already verified",
  "payment_id": "uuid-here"
}
```

**Verification Failed (422):**
```json
{
  "success": false,
  "error": "Payment verification failed: Transaction not successful"
}
```

**Invalid Input (400):**
```json
{
  "success": false,
  "error": "Transaction reference is required"
}
```

### Step 5: Check Edge Function Logs

1. Go to https://supabase.com/dashboard/project/xuyioczahgozvdbfodht/functions/verify-paystack-payment/logs
2. Look for your test transaction logs
3. Verify successful verification and database insertion

---

## 🚀 Production Deployment

### Step 1: Switch to Live Keys

**⚠️ CRITICAL: Only do this when ready for real payments!**

1. **Get live keys from Paystack:**
   - Go to https://dashboard.paystack.com/#/settings/developer
   - Switch to **Live Mode** (toggle in top-right)
   - Copy **Live Public Key** (pk_live_...)
   - Copy **Live Secret Key** (sk_live_...)

2. **Update client .env:**
   ```bash
   # Change from pk_test to pk_live
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_live_key_here
   ```

3. **Update server secret:**
   ```bash
   supabase secrets set PAYSTACK_SECRET_KEY=sk_live_your_actual_live_key_here --project-ref xuyioczahgozvdbfodht
   ```

4. **Verify configuration:**
   ```bash
   # Client-side check
   echo $VITE_PAYSTACK_PUBLIC_KEY  # Should start with pk_live

   # Server-side check
   supabase secrets list --project-ref xuyioczahgozvdbfodht
   ```

### Step 2: Deploy Application

```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify/your hosting
# Ensure environment variables are set in hosting dashboard
```

### Step 3: Test Live Payment (Small Amount)

1. Make a test purchase with a real card for the minimum amount (₦5.00)
2. Verify payment appears in:
   - Paystack Dashboard: https://dashboard.paystack.com/#/transactions
   - Your payments table: Check Supabase Editor
3. Confirm subscription activated correctly
4. Request refund via Paystack if needed

### Step 4: Monitor Live Transactions

1. **Paystack Dashboard:**
   - https://dashboard.paystack.com/#/transactions
   - Monitor all transactions in real-time

2. **Edge Function Logs:**
   - https://supabase.com/dashboard/project/xuyioczahgozvdbfodht/functions/verify-paystack-payment/logs
   - Watch for verification errors

3. **Database Records:**
   ```sql
   -- Check today's payments
   SELECT * FROM payments 
   WHERE created_at >= CURRENT_DATE 
   ORDER BY created_at DESC;
   
   -- Check active subscriptions
   SELECT COUNT(*) as active_premium_users 
   FROM subscriptions 
   WHERE status = 'active';
   ```

---

## 🔔 Webhook Setup (Optional but Recommended)

Webhooks provide automatic payment notifications from Paystack, reducing dependency on client-side callbacks.

### Why Use Webhooks?

- ✅ **More Reliable:** Works even if user closes browser
- ✅ **Better UX:** Instant confirmation without user interaction
- ✅ **Handles Edge Cases:** Captures payments that succeed after page closure
- ✅ **Audit Trail:** Complete payment history from Paystack

### Setup Instructions

#### Step 1: Create Webhook Endpoint

The existing `verify-paystack-payment` edge function can be extended to handle webhooks. Create a new function:

```bash
# Create webhook handler (similar to verify-paystack-payment)
# File: supabase/functions/paystack-webhook/index.ts
```

#### Step 2: Register Webhook in Paystack

1. Go to https://dashboard.paystack.com/#/settings/developer
2. Click **Webhooks**
3. Click **Add Webhook URL**
4. Enter URL: `https://xuyioczahgozvdbfodht.supabase.co/functions/v1/paystack-webhook`
5. Select events:
   - ✅ `charge.success`
   - ✅ `charge.failed`
6. Copy the **Webhook Secret** (for signature verification)
7. Click **Save**

#### Step 3: Verify Webhook Signature

Always verify webhook signatures to prevent fake webhook calls:

```typescript
// In webhook handler
const signature = req.headers.get('x-paystack-signature');
const webhookSecret = Deno.env.get('PAYSTACK_WEBHOOK_SECRET');

// Compute hash
const hash = crypto.createHmac('sha512', webhookSecret)
  .update(JSON.stringify(body))
  .digest('hex');

if (hash !== signature) {
  return new Response('Invalid signature', { status: 401 });
}
```

#### Step 4: Test Webhook

Use Paystack's webhook testing feature:
1. Go to webhook settings
2. Click **Send Test Webhook**
3. Check edge function logs for received event

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Payment gateway not configured"

**Symptom:** Error when clicking payment button

**Cause:** `VITE_PAYSTACK_PUBLIC_KEY` not set or still has placeholder value

**Fix:**
```bash
# Check .env file
cat .env | grep PAYSTACK

# Should show:
VITE_PAYSTACK_PUBLIC_KEY=pk_test_actual_key_here  # NOT 'pk_test_placeholder'

# If placeholder, update with real key and restart dev server
npm run dev
```

#### 2. "Payment verification failed"

**Symptom:** Payment succeeds but verification fails

**Cause:** Edge function can't access `PAYSTACK_SECRET_KEY`

**Fix:**
```bash
# Check secret is set
supabase secrets list --project-ref xuyioczahgozvdbfodht

# If missing, set it:
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_your_key_here --project-ref xuyioczahgozvdbfodht

# Redeploy edge function (automatic in Lovable)
```

#### 3. "Failed to load Paystack script"

**Symptom:** Payment popup doesn't open

**Cause:** Network issue or ad blocker

**Fix:**
- Check browser console for errors
- Disable ad blockers temporarily
- Check internet connection
- Try incognito/private mode

#### 4. Payment succeeds but user doesn't get premium

**Symptom:** Payment recorded but subscription not activated

**Cause:** `renew_premium_subscription` function failed

**Fix:**
```bash
# Check edge function logs
# Look for "MANUAL INTERVENTION REQUIRED" message

# Manually activate subscription
SELECT renew_premium_subscription('user_id_here'::uuid);

# Link payment to subscription
UPDATE subscriptions 
SET payment_id = 'payment_id_here' 
WHERE user_id = 'user_id_here' AND status = 'active';
```

#### 5. Test cards not working

**Symptom:** All test payments fail

**Cause:** Using live keys in test environment or vice versa

**Fix:**
- Verify you're using **test keys** (pk_test_..., sk_test_...)
- Check Paystack Dashboard is in **Test Mode**
- Try the standard test card: `4084 0840 8408 4081`

### Checking Configuration

```bash
# ✅ Client-side check
echo "Public Key: $VITE_PAYSTACK_PUBLIC_KEY"
# Should output: pk_test_... or pk_live_...

# ✅ Server-side check (requires Supabase CLI)
supabase secrets list --project-ref xuyioczahgozvdbfodht
# Should show: PAYSTACK_SECRET_KEY

# ✅ Database check
psql $SUPABASE_DB_URL -c "SELECT EXISTS(SELECT 1 FROM payments LIMIT 1) as has_payments;"
```

### Debug Mode

Enable detailed logging in PaystackPaymentModal.tsx:

```typescript
// Line 1: Add after imports
const DEBUG = true;

// Throughout component, logs are already present
// Check browser console (F12) for detailed flow
```

---

## ✅ Security Checklist

Before going to production, verify:

### Client-Side Security
- [ ] ✅ No `sk_` keys appear in any client-side files
- [ ] ✅ No `SUPABASE_SERVICE_ROLE_KEY` in client code
- [ ] ✅ `.env` file is in `.gitignore`
- [ ] ✅ Only `VITE_PAYSTACK_PUBLIC_KEY` used in frontend
- [ ] ✅ Public key starts with `pk_test_` (test) or `pk_live_` (prod)

### Server-Side Security
- [ ] ✅ `PAYSTACK_SECRET_KEY` set in Supabase secrets
- [ ] ✅ Secret key starts with `sk_test_` (test) or `sk_live_` (prod)
- [ ] ✅ Edge function verifies transactions before database writes
- [ ] ✅ Amount and currency validated server-side
- [ ] ✅ Email verified to match Paystack customer
- [ ] ✅ Rate limiting enabled (10 req/min per IP)

### Database Security
- [ ] ✅ RLS enabled on `payments` table
- [ ] ✅ Service role policy allows edge function writes
- [ ] ✅ Users can only see their own payments
- [ ] ✅ `reference` field has unique constraint
- [ ] ✅ `trial_end` set to 2026-01-01 for all users

### Testing
- [ ] ✅ Test card payment successful
- [ ] ✅ Failed payment handled gracefully
- [ ] ✅ Duplicate verification blocked (idempotency)
- [ ] ✅ Edge function logs checked
- [ ] ✅ Payment appears in database
- [ ] ✅ Subscription activated correctly
- [ ] ✅ Trial period active until 2026-01-01

### Production Readiness
- [ ] ✅ Live keys obtained from Paystack
- [ ] ✅ Webhook registered (optional but recommended)
- [ ] ✅ Webhook secret stored securely
- [ ] ✅ Monitoring set up (logs, alerts)
- [ ] ✅ Customer support process defined
- [ ] ✅ Refund policy documented
- [ ] ✅ Terms of service updated

---

## 📞 Support & Resources

### Paystack Documentation
- **Accept Payments:** https://paystack.com/docs/payments/accept-payments/
- **Verify Payments:** https://paystack.com/docs/payments/verify-payments/
- **Test Cards:** https://paystack.com/docs/payments/test-payments/
- **Webhooks:** https://paystack.com/docs/payments/webhooks/
- **API Reference:** https://paystack.com/docs/api/

### Supabase Documentation
- **Edge Functions:** https://supabase.com/docs/guides/functions
- **Edge Function Secrets:** https://supabase.com/docs/guides/functions/secrets
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security

### Need Help?
- **Paystack Support:** support@paystack.com
- **Supabase Support:** https://supabase.com/support
- **Healinton Issues:** [Your support email/channel]

---

## 📝 Backup & Rollback

### Backup Trial Period Settings

Before making changes, backup current trial settings:

```sql
-- Backup profiles table
CREATE TABLE profiles_backup_20250127 AS 
SELECT * FROM profiles;

-- To restore if needed:
-- UPDATE profiles 
-- SET trial_end = profiles_backup_20250127.trial_end
-- FROM profiles_backup_20250127
-- WHERE profiles.id = profiles_backup_20250127.id;
```

### Rollback to Old Payment System

If you need to revert to the previous payment system:

1. **Stop using Paystack modal:**
   ```typescript
   // In src/pages/Premium.tsx
   import PaymentModal from '@/components/PaymentModal'; // Old modal
   // Instead of PaystackPaymentModal
   ```

2. **Disable edge function:**
   ```bash
   # Remove from supabase/config.toml
   # Delete [functions.verify-paystack-payment] section
   ```

3. **Revert database changes:**
   ```sql
   -- Remove Paystack-specific columns
   ALTER TABLE payments DROP COLUMN IF EXISTS reference;
   ALTER TABLE payments DROP COLUMN IF EXISTS paid_at;
   
   -- Revert trial_end (if needed)
   UPDATE profiles SET trial_end = NULL;
   ALTER TABLE profiles DROP COLUMN trial_end;
   ```

---

## 🎉 Success Criteria

Your Paystack integration is successfully implemented when:

1. ✅ Users can pay using test cards in development
2. ✅ Payments are verified server-side via Edge Function
3. ✅ Payment records stored in `payments` table
4. ✅ Premium subscriptions activated automatically
5. ✅ All users have trial access until 2026-01-01
6. ✅ No secret keys exposed in client code
7. ✅ Edge function logs show successful verifications
8. ✅ Test mode indicator shows during development
9. ✅ Ready to switch to live keys for production

---

**Last Updated:** January 27, 2025
**Version:** 1.0.0
**Maintained by:** Healinton Development Team
