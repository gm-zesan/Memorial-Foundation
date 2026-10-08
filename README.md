# [MEMORIAL PERSON NAME] Memorial Foundation Website

A complete, production-quality Memorial Foundation website built with HTML5, CSS3, Bootstrap 5.3.3, and Vanilla JavaScript.

## 🌟 Visual & Architectural Inspiration
- Designed with reference to the aesthetic quality, spacing, and typographic balance of international nonprofit designs such as **Benevia** ([https://benevia99.webflow.io/](https://benevia99.webflow.io/)).
- **100% Independent Implementation**: Clean, handwritten HTML/CSS/JS without any Webflow proprietary classes, framework bloat, or external JS runtime dependencies.
- **Narrative**: *"Remember the life. Continue the legacy. Change lives."*

---

## 🎨 Theme & Color Palette
The website strictly adopts the official memorial foundation palette:
- **Primary Blue (`#005daa`)**: Represents trust, stability, and enduring institutional legacy.
- **Secondary Gold/Yellow (`#ffb81c`)**: Represents hope, warmth, action, and key donation call-to-actions.
- **Supporting Neutral Dark (`#102a43`)**: Rich dark navy used for headings and footer.
- **Background Light (`#f5f8fb`)**: Clean off-white surface tone.
- **Typography**: 
  - Headings: `Playfair Display` (Classic, dignified editorial serif)
  - Body: `Inter` (Clean, legible, modern sans-serif)

---

## 📂 File Structure
```
/
├── index.html                 # Comprehensive homepage with all memorial & foundation sections
├── about.html                 # Memorial biography, origin, mission, trustees & transparency audit
├── programs.html              # Core pillars (Education, Healthcare, Relief, Women & WASH)
├── projects.html              # List of active grassroots community projects
├── project-details.html       # Individual project case study with goals & budget progress
├── impact.html                # Measurable metrics, longitudinal evaluations & count-up stats
├── stories.html               # Human impact stories of change
├── story-details.html         # In-depth beneficiary narrative and quotes
├── events.html                # Upcoming memorial days, clinics, and relief drives
├── event-details.html         # Detailed event schedule, times, and RSVP
├── gallery.html               # Filterable photo gallery with modal lightbox
├── volunteer.html             # Volunteer roles and application form with validation
├── donate.html                # Interactive one-time/monthly donation widget & payment UI
├── contact.html               # Contact information, office hours, and inquiry form
├── faq.html                   # Accordion FAQ covering donations, audit, and sponsorships
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Core CSS variables, typography, component styles
│   │   └── responsive.css     # Mobile-first and breakpoint refinements (320px–1400px+)
│   ├── js/
│   │   └── main.js            # Sticky header, stats count-up, donation widget, gallery, validation
│   └── images/                # Organized image directories for future custom photo assets
│
└── README.md                  # Project documentation
```

---

## 🚀 Features & Interactive Modules
1. **Sticky Header**: Seamlessly transitions to compact mode with subtle elevation shadow on scroll.
2. **Dynamic Count-Up Statistics**: Uses `IntersectionObserver` to animate statistics upon entering viewport.
3. **Interactive Donation Widget**:
   - Toggle between **One-Time** and **Monthly Legacy Pledge**.
   - Select preset amounts (`৳500`, `৳1,000`, `৳2,500`, `৳5,000`) or input custom values.
   - Payment method toggle (bKash, Nagad, Card, Bank Transfer) ready for backend gateway API integration.
4. **Filterable Gallery & Lightbox**:
   - Filter items by category (Memorial, Medical Camps, Education, Community).
   - High-resolution modal preview on click.
5. **Client-Side Form Validation**:
   - Interactive validation on Contact and Volunteer forms with feedback alerts.
6. **Responsive Fidelity**:
   - Specifically tested across mobile (320px, 375px, 480px), tablet (768px, 992px), and large desktop displays (1200px+).

---

## 💻 How to Run
Simply open `index.html` in any modern web browser or run a lightweight local static server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.
