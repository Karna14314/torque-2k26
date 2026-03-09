# Registration Testing Checklist

## Before Testing
- [ ] `npm run dev` is running
- [ ] `festInfo.appsScriptUrl` is empty string (test mode)
- [ ] `festInfo.registrationOpen` is `false` (test closed state)

## Test 1 — Registration Closed
- [ ] Click Register on any event card
- [ ] `RegistrationClosed` modal appears with lock emoji
- [ ] Countdown timer is running (updates every second)
- [ ] Instagram button is clickable
- [ ] "Got it" button closes modal
- [ ] Click overlay to close modal works

## Test 2 — Enable Registration
- [ ] Set `festInfo.registrationOpen: true` in `src/data/data.js`
- [ ] Save and verify hot reload works
- [ ] No console errors

## Test 3 — Internal Registration (UCEK Student)
- [ ] Click Register on any event card
- [ ] Step 1 shows 3 type cards with correct prices:
  - [ ] UCEK Student — FREE (green badge)
  - [ ] Outside College — ₹150 (gold badge)
  - [ ] On-Site Walk-in — ₹200 (gold badge)
- [ ] Step dots show 3 active dots at top
- [ ] Item badge shows "EVENT · [Event Name]"
- [ ] Select UCEK Student → goes to Step 2
- [ ] Step 2 shows Name, Phone, Email fields
- [ ] Step 2 also shows Roll No, Branch, Year (internal-specific)
- [ ] Try submit without filling Name → error appears
- [ ] Fill invalid phone (5 digits) → error "Phone must be 10 digits"
- [ ] Fill invalid email → error message
- [ ] Fill all required fields correctly → no errors
- [ ] Click "Submit Registration" → loading spinner shows
- [ ] After ~1.5s → Step 4 success page appears
- [ ] Shows animated checkmark ✓
- [ ] Shows "You're Registered!" heading in gold
- [ ] Show registration ID like "TRQ26-EVT-XXXX"
- [ ] Shows "FREE" in green
- [ ] Shows "✅ You're all set! Bring your college ID..."
- [ ] Shows confirmation email note with entered email
- [ ] "Done" button closes modal

## Test 4 — External Registration (Outside College)
- [ ] Click Register on any event card
- [ ] Select "Outside College" on Step 1
- [ ] Step 2 shows Name, Phone, Email, College field
- [ ] Does NOT show Roll No, Branch, Year (correct)
- [ ] Click "Next — Payment →"
- [ ] Step 3 Payment page appears
- [ ] Shows "Amount to Pay: ₹150" in large gold text
- [ ] Shows UPI ID in gold monospace font
- [ ] UPI copy button (📋) works → shows "✓" or "Copied!" feedback
- [ ] Transaction ID field is empty with placeholder text
- [ ] Try submit without Transaction ID → error "Transaction ID is required"
- [ ] Enter a valid transaction ID (e.g., "123456789012")
- [ ] Click "Confirm Registration" → loading spinner
- [ ] Step 4 success appears
- [ ] Shows "PENDING VERIFICATION" status (not WAIVED)
- [ ] Shows "⏳ Payment verification pending..." message
- [ ] Shows entered transaction ID in the status box
- [ ] Confirmation email shows correct email address

## Test 5 — On-Site Registration (Walk-in)
- [ ] Click Register on any event card
- [ ] Select "On-Site Walk-in" on Step 1
- [ ] Step 2 shows Name, Phone, Email, College (optional), Payment Method
- [ ] Payment Method shows two toggle buttons: "💵 Cash" and "📱 UPI"
- [ ] Cash button unselected initially (dark background)
- [ ] Click Cash → button turns gold, selected
- [ ] Click UPI → button turns gold, selected
- [ ] Try submit without selecting payment method → error
- [ ] Select UPI
- [ ] Click "Submit Registration" → loading spinner
- [ ] Step 4 success appears directly (Step 3 is skipped for onsite)
- [ ] Shows correct onsite price "₹200"
- [ ] Shows "📍 Visit the registration desk..." message
- [ ] Shows "Pay ₹200 via UPI at the venue"
- [ ] Switch payment to Cash and test again → message shows "Pay ₹200 via CASH"

## Test 6 — Workshop Registration
- [ ] Scroll to Workshops section
- [ ] Click Register on the Robotics workshop card
- [ ] Follow all 3 registration types (internal, external, onsite)
- [ ] Registration ID shows "TRQ26-WRK-XXXX" (WRK not EVT)
- [ ] Prices show workshop prices:
  - [ ] Internal: FREE
  - [ ] External: ₹500
  - [ ] Onsite: ₹600
- [ ] All form fields work correctly
- [ ] Success page shows correct workshop details

## Test 7 — Form State & Navigation
- [ ] Step 1 → Step 2: type is saved
- [ ] Step 2 → Back → Step 1: form data preserved (can select different type)
- [ ] Step 2 → Step 3 (external only): form data preserved, can go Back to edit
- [ ] Step 3 → Back → Step 2: email/phone preserved
- [ ] Error count clears when user corrects field
- [ ] Close button (×) on any step closes modal

## Test 8 — Copy to Clipboard
- [ ] UPI ID copy (Step 3): Click button → shows feedback for 2 seconds
- [ ] Registration ID copy (Step 4): Click ID → shows feedback for 2 seconds
- [ ] Copied text can be pasted elsewhere

## Test 9 — Step Indicators
- [ ] Step dots appear on Steps 1, 2, 3
- [ ] Step dots do NOT appear on Step 4 (success)
- [ ] Active dot is wider (24px), inactive dots are round (8px)
- [ ] Dots update as you progress through steps

## Test 10 — Responsive Design
- [ ] Test on mobile (375px width)
  - [ ] Modal is visible and readable
  - [ ] Buttons are clickable
  - [ ] Form inputs are accessible
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1024px+ width)

## Test 11 — Item Badge & Visuals
- [ ] Item badge shows correct category:
  - [ ] "EVENT · Chess Monarch" for events
  - [ ] "WORKSHOP · Robotics" for workshops
- [ ] Card hover effects work (darker background, translate)
- [ ] Modal has correct dark neumorphic styling
- [ ] Backdrop blur is visible

## Before Merging to Main
- [ ] Set `festInfo.registrationOpen: false` in `src/data/data.js`
- [ ] All 11 tests above pass locally
- [ ] Console has no errors or warnings
- [ ] Apps Script deployed to script.google.com
- [ ] Deployment URL added to `festInfo.appsScriptUrl` in `src/data/data.js`
- [ ] Google Sheet created with MASTER tab
- [ ] Column headers added to MASTER sheet (optional but recommended)
- [ ] Test one real submission with Apps Script URL:
  - [ ] Registration submitted
  - [ ] New row appears in Google Sheet within 5 seconds
  - [ ] Registration ID generated correctly
  - [ ] Confirmation email arrives in inbox (check spam folder)
- [ ] Coordinator email configured and tested (if applicable)
- [ ] Run `git merge feature/registration` into main
- [ ] Run `git push origin main`
- [ ] Deploy to production (Vercel or hosting service)

## Manual QA Checklist
- [ ] No console errors
- [ ] No TypeScript/ESLint warnings
- [ ] All buttons have proper hover states
- [ ] All form fields have focus states (gold border, shadow)
- [ ] Error messages are red and visible
- [ ] Success page is fully visible without scroll on mobile
- [ ] Navigation between steps feels smooth
- [ ] Loading state shows spinner, disables button
- [ ] Modal can be closed from any step
- [ ] Email validation catches common mistakes (@, ., domain)
- [ ] Phone validation requires exactly 10 digits
