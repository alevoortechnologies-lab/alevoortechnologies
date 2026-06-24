import sys; sys.path.insert(0, 'build_tmp')
from parts import NAV, FOOTER, FLOATS, FONTS


def head(title, desc):
    return ('<!DOCTYPE html>\n<html lang="en">\n<head>\n'
            '  <meta charset="UTF-8" />\n'
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n'
            '  <title>' + title + '</title>\n'
            '  <meta name="description" content="' + desc + '" />\n'
            '  <link rel="canonical" href="https://alevoortechnologies.lovable.app" />\n'
            + FONTS + '\n</head>\n<body>\n\n'
            '<div id="loading"><img class="loading-logo" src="/assets/logo.png" alt="Alevoor Technologies" /></div>\n')


def page(title, desc, body):
    return head(title, desc) + NAV + body + FOOTER + FLOATS


def ph(h, sub, crumb):
    return ('<div class="page-header"><div class="hero-blob hero-blob-1"></div>'
            '<h1>' + h + '</h1><p>' + sub + '</p>'
            '<div class="crumb"><a href="/">Home</a> &rsaquo; ' + crumb + '</div></div>\n')


# ---------------- HOME ----------------
HOME_BODY = '''
<section id="hero">
  <div class="hero-blob hero-blob-1"></div>
  <div class="hero-blob hero-blob-2"></div>
  <div class="hero-chip">Now Serving 100+ Clients Across India 🇮🇳</div>
  <div class="hero-slideshow" id="hero-slideshow">
    <img class="hero-slide active" src="/assets/slide-1.jpg" alt="Modern tech workspace" />
    <img class="hero-slide" src="/assets/slide-2.jpg" alt="Software team building digital products" />
    <img class="hero-slide" src="/assets/slide-3.jpg" alt="AI and cloud technology solutions" />
    <div class="hero-dots" id="hero-dots"></div>
  </div>
  <h1 class="hero-h1" id="hero-headline">Where Technology<span class="hero-h1-accent">Meets Growth.</span></h1>
  <p class="hero-sub" id="hero-subtitle">We build software. We scale creators. We power businesses.</p>
  <div class="hero-btns">
    <a class="btn-primary" href="/contact">Start Your Project →</a>
    <a class="btn-outline" href="/portfolio">View Our Work</a>
  </div>
  <div class="hero-stats" id="hero-stats"></div>
  <div class="hero-wave-text">🌊 Rooted Strong. Flowing Forward.</div>
</section>

<section class="marquee-section">
  <div class="container text-center"><div class="marquee-label">TRUSTED BY GROWING CREATORS &amp; BUSINESSES</div></div>
  <div class="marquee-wrapper"><div class="marquee-track" id="marquee-track"></div></div>
</section>

<section id="services" class="section">
  <div class="container">
    <div class="text-center">
      <div class="chip">What We Do</div>
      <h2 class="section-title">Software. Content. <span class="accent">Growth.</span></h2>
      <p class="section-sub">From custom software to content systems — everything you need to build and scale, under one roof.</p>
    </div>
    <div class="services-grid teaser fade-up stagger" id="services-grid"></div>
    <div class="text-center" style="margin-top:30px">
      <a class="btn-primary" href="/services">View All Services &amp; Courses →</a>
    </div>
  </div>
</section>

<section id="founder-quote" class="section" style="background:linear-gradient(135deg,#f0ecff,#e8fdf5)">
  <div class="container">
    <div class="fq-grid">
      <div class="fade-up">
        <div class="fq-mark">"</div>
        <div class="fq-text">The name Alevoor means waves. In the ocean, waves don't stop — they just keep building momentum, each one carrying the last further than before.</div>
        <div class="fq-by">— Rishabh Alevoor, Founder &amp; CEO</div>
      </div>
      <div class="fade-up">
        <div class="founder-frame" style="aspect-ratio:4/5">
          <img class="founder-photo" src="/assets/founder.jpg" alt="Rishabh Alevoor, Founder & CEO" />
        </div>
        <div class="founder-name-card">
          <div class="founder-name">Rishabh Alevoor</div>
          <div class="founder-role">Founder &amp; CEO</div>
        </div>
        <div class="text-center" style="margin-top:16px"><a class="btn-outline" href="/about">Read Our Story →</a></div>
      </div>
    </div>
  </div>
</section>

<section id="testimonials" class="section" style="background:var(--white)">
  <div class="container">
    <div class="ts-head">
      <div class="ts-titles">
        <div class="chip">Client Reviews</div>
        <h2 class="section-title left">What Our <span class="accent">Clients Say</span></h2>
        <p class="section-sub" style="text-align:left;margin:0">Don't just take our word for it. See what our happy clients have to say.</p>
      </div>
      <div class="ts-rating-card">
        <div class="ts-rating-stars">★★★★★</div>
        <div class="ts-rating-num">4.9</div>
        <div class="ts-rating-sub">100+ reviews</div>
      </div>
    </div>
    <div id="testi-slider" class="ts-viewport"><div class="ts-track" id="testi-slider-track"></div></div>
    <div class="ts-nav">
      <button onclick="window.__tsPrev && window.__tsPrev()" aria-label="Previous">←</button>
      <button onclick="window.__tsNext && window.__tsNext()" aria-label="Next">→</button>
    </div>
  </div>
</section>

<section class="home-cta">
  <h2>Ready to Build Something Great?</h2>
  <p>Whether you need software, content strategy, or digital growth — we're ready.</p>
  <div class="hero-btns" style="margin:0;justify-content:center">
    <a class="btn-primary" href="/contact">Start Your Project →</a>
    <a class="btn-outline" href="/contact">Book Free Call</a>
  </div>
</section>
'''

# ---------------- ABOUT ----------------
ABOUT_BODY = ph('About <span class="accent">Alevoor Technologies</span>',
                'From coastal Karnataka to the digital world — here\'s our story.', 'About Us') + '''
<section id="about" class="section about-section">
  <div class="container">
    <div class="about-grid">
      <div class="about-card about-teal fade-up">
        <div class="about-card-icon">🎯</div>
        <h3>Our Mission</h3>
        <p>To democratize digital growth — making world-class software and content strategy accessible to every creator and business in India.</p>
      </div>
      <div class="about-card about-purple fade-up">
        <div class="about-card-icon">🔭</div>
        <h3>Our Vision</h3>
        <p>To become India's most trusted technology + digital growth company — from Karnataka to the world.</p>
      </div>
      <div class="about-card about-coral fade-up">
        <div class="about-card-icon">🌊</div>
        <h3>Our Values</h3>
        <ul class="about-values-list">
          <li>🌊 Wave-Driven Growth</li>
          <li>❤️ Creator-First Always</li>
          <li>📊 Data Over Guesswork</li>
          <li>🤝 Radical Transparency</li>
          <li>🔁 Consistent Execution</li>
        </ul>
      </div>
      <div class="about-card about-navy fade-up">
        <div class="about-card-icon">📈</div>
        <h3>Our Impact</h3>
        <div class="about-impact-grid">
          <div><div class="about-impact-val">50+</div><div class="about-impact-label">YouTube Channels</div></div>
          <div><div class="about-impact-val">10M+</div><div class="about-impact-label">Reach Generated</div></div>
          <div><div class="about-impact-val">100+</div><div class="about-impact-label">Happy Clients</div></div>
          <div><div class="about-impact-val">3x</div><div class="about-impact-label">Average Growth</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="founder" class="section" style="background:linear-gradient(135deg,#f0ecff,#e8fdf5)">
  <div class="container">
    <div class="text-center" style="margin-bottom:40px">
      <div class="chip">Meet the Founder</div>
      <h2 class="section-title">Rishabh <span class="accent">Alevoor</span></h2>
    </div>
    <div class="founder-grid">
      <div class="fade-up">
        <div class="founder-frame">
          <img class="founder-photo" src="/assets/founder.jpg" alt="Rishabh Alevoor, Founder & CEO of Alevoor Technologies" />
          <div class="founder-watch-badge" onclick="openVideo()">▶ Watch Introduction</div>
          <div class="founder-play-ring"></div>
          <button class="founder-play" onclick="openVideo()" aria-label="Play founder introduction video"></button>
        </div>
        <div class="founder-name-card">
          <div class="founder-name" id="founder-name">Rishabh Alevoor</div>
          <div class="founder-role" id="founder-role">Founder &amp; CEO, Alevoor Technologies</div>
        </div>
      </div>
      <div class="fade-up">
        <p style="font-size:14px;color:var(--gray);line-height:1.8;margin-bottom:16px">Born and raised with roots in Alevoor, coastal Karnataka — a place where the ocean waves never stop moving — Rishabh built a vision around momentum that builds on itself.</p>
        <p style="font-size:14px;color:var(--gray);line-height:1.8;margin-bottom:16px">He built Alevoor Technologies to bridge the gap between world-class technology and accessible digital growth — delivering software, content, and marketing that helps creators and businesses scale.</p>
        <div class="founder-values">
          <div class="founder-value"><div class="founder-value-icon">🏆</div><div><div class="founder-value-title">100+ Clients</div></div></div>
          <div class="founder-value"><div class="founder-value-icon">📱</div><div><div class="founder-value-title">50+ YouTube Channels</div></div></div>
          <div class="founder-value"><div class="founder-value-icon">🌍</div><div><div class="founder-value-title">Pan-India</div></div></div>
        </div>
        <div class="founder-quote">"The name Alevoor means waves. And just like waves — we create momentum that builds on itself, carries creators forward, and never truly stops."</div>
      </div>
    </div>
  </div>
</section>

<section class="section ecosystem-section">
  <div class="container">
    <div class="text-center" style="margin-bottom:40px">
      <h2 class="section-title">The Alevoor <span class="accent">Ecosystem</span></h2>
      <p class="section-sub">One parent company. Multiple brands. One mission.</p>
    </div>
    <div class="ecosystem-grid">
      <div class="ecosystem-card eco-teal fade-up">
        <div class="eco-badge eco-badge-teal">PARENT COMPANY</div>
        <div class="eco-logo eco-logo-grad">AT</div>
        <h3>Alevoor Technologies</h3>
        <div class="eco-type">Software + Digital Growth Company</div>
        <p>Full-service technology and digital growth company offering software development, content management, digital marketing, and educational courses.</p>
        <div class="eco-tags"><span>Software</span><span>Content</span><span>Marketing</span><span>Courses</span></div>
      </div>
      <div class="ecosystem-card eco-purple fade-up">
        <div class="eco-badge eco-badge-purple">SISTER BRAND</div>
        <div class="eco-logo eco-logo-dark">RR</div>
        <h3>RR Creator Lab</h3>
        <a href="https://rrcreatorlab.in" target="_blank" rel="noopener" class="eco-web">rrcreatorlab.in</a>
        <div class="eco-type">YouTube &amp; Instagram Growth Studio</div>
        <p>Specialized brand focused exclusively on YouTube and Instagram growth for content creators — editing, posting, analytics, and channel optimization.</p>
        <div class="eco-tags"><span>YouTube</span><span>Instagram</span><span>Editing</span><span>Analytics</span></div>
        <a href="https://rrcreatorlab.in" target="_blank" rel="noopener" class="btn-outline eco-visit">Visit RR Creator Lab →</a>
      </div>
    </div>
    <p class="text-center eco-note">Alevoor Technologies is the parent unit of RR Creator Lab. Both share the same team, values, and mission.</p>
  </div>
</section>

<section id="process" class="section">
  <div class="container">
    <div class="text-center">
      <div class="chip">How We Work</div>
      <h2 class="section-title">Our <span class="accent">Process</span></h2>
      <p class="section-sub">A simple, transparent process designed to deliver consistent results.</p>
    </div>
    <div class="process-list fade-up" id="process-list"></div>
  </div>
</section>

<section id="whyus" class="section">
  <div class="container">
    <div class="why-grid">
      <div class="why-left fade-up">
        <div class="chip">Why Choose Us</div>
        <h2>Why <span>Alevoor Technologies?</span></h2>
        <p>We architect scalable digital solutions through clean code and smart engineering. Like waves from our coastal Karnataka roots — we build technology that never stops evolving.</p>
        <div class="why-quote">"We don't just manage projects — we engineer ecosystems and help businesses scale. Rooted Strong. Flowing Forward."</div>
      </div>
      <div class="why-cards fade-up" id="why-cards"></div>
    </div>
  </div>
</section>

<section id="team" class="section">
  <div class="container">
    <div class="text-center">
      <div class="chip">Our Team</div>
      <h2 class="section-title">Meet the <span class="accent2">Creative Minds</span></h2>
      <p class="section-sub">The people behind the momentum — editors, strategists and builders.</p>
    </div>
    <div class="team-grid fade-up stagger" id="team-grid"></div>
  </div>
</section>
'''

# ---------------- SERVICES ----------------
SERVICES_BODY = ph('Our Services &amp; <span class="accent">Courses</span>',
                   'Everything you need to build, grow, and scale — under one roof.', 'Services') + '''
<section id="services" class="section">
  <div class="container">
    <div class="filter-bar" id="service-filters">
      <button class="filter-btn active" onclick="filterServices('All', this)">All</button>
      <button class="filter-btn" onclick="filterServices('Software', this)">Software</button>
      <button class="filter-btn" onclick="filterServices('Marketing', this)">Digital Marketing</button>
      <button class="filter-btn" onclick="filterServices('Content', this)">Content &amp; Social</button>
      <button class="filter-btn" onclick="filterServices('Tech', this)">Tech</button>
    </div>
    <div class="services-grid fade-up stagger" id="services-grid"></div>
  </div>
</section>

<section id="courses" class="section">
  <div class="container">
    <div class="text-center">
      <div class="chip">Education</div>
      <h2 class="section-title">Learn From Our <span class="accent2">Experts</span></h2>
      <p class="section-sub">Practical courses built from real experience — not theory.</p>
    </div>
    <div class="course-detail open" style="margin-top:10px">
      <div class="course-detail-grid" id="course-detail-grid"></div>
    </div>
  </div>
</section>
'''

# ---------------- PORTFOLIO ----------------
PORTFOLIO_BODY = ph('Portfolio &amp; <span class="accent2">Gallery</span>',
                    'Real work. Real results. See what we\'ve built and created.', 'Portfolio') + '''
<section id="portfolio" class="section">
  <div class="container">
    <div class="filter-bar" style="margin-bottom:32px">
      <button class="filter-btn active" id="ptab-case" onclick="switchPortfolio('case')">📊 Case Studies</button>
      <button class="filter-btn" id="ptab-gallery" onclick="switchPortfolio('gallery')">🖼 Gallery</button>
    </div>
    <div id="portfolio-case">
      <div class="portfolio-grid fade-up stagger" id="portfolio-grid"></div>
    </div>
    <div id="portfolio-gallery" style="display:none">
      <div class="gallery-grid" id="gallery-grid"></div>
      <p class="text-center" id="gallery-empty" style="color:var(--light);font-size:14px;display:none">🖼 No gallery items yet. Add from Admin Panel.</p>
    </div>
  </div>
</section>
'''

# ---------------- CONTACT ----------------
CONTACT_BODY = ph('Let\'s <span class="accent">Connect</span>',
                  'Start a conversation. Tell us what you\'re building.', 'Contact') + '''
<section id="contact" class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-card fade-up">
        <h3>Send Us a Message</h3>
        <p>Fill out our quick form and we'll get back to you within 24 hours.</p>
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" type="text" placeholder="Your name" id="f-name" /></div>
        <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" type="email" placeholder="you@email.com" id="f-email" /></div>
        <div class="form-group"><label class="form-label">What do you need?</label><input class="form-input" type="text" placeholder="Content / Software / Website / Course / Other" id="f-platform" /></div>
        <div class="form-group"><label class="form-label">Message / Goals</label><textarea class="form-input" placeholder="Tell us about your project..." id="f-msg"></textarea></div>
        <button class="btn-submit" onclick="submitForm()">Send Message 🚀</button>
      </div>
      <div class="contact-card fade-up">
        <h3>Reach Out Directly</h3>
        <p>Prefer a quick chat? Connect with us through any of these channels.</p>
        <div class="contact-item" id="c-whatsapp"><div class="contact-item-icon">📱</div><div><div class="contact-item-label">WhatsApp</div><div class="contact-item-val" id="contact-phone">+91 9483886270</div></div></div>
        <div class="contact-item" id="c-email"><div class="contact-item-icon">✉️</div><div><div class="contact-item-label">Email</div><div class="contact-item-val" id="contact-email">alevoor@gmail.com</div></div></div>
        <div class="contact-item" id="c-insta"><div class="contact-item-icon">📸</div><div><div class="contact-item-label">Instagram</div><div class="contact-item-val" id="contact-insta">@alevoor</div></div></div>
        <div class="contact-item" id="c-meeting"><div class="contact-item-icon">📅</div><div><div class="contact-item-label">Book a Meeting</div><div class="contact-item-val">Free 30-min consultation</div></div></div>
        <div style="margin-top:18px;padding:16px;border-radius:14px;background:var(--teal-light)">
          <div style="font-weight:700;font-size:14px;margin-bottom:8px;color:var(--text)">⚡ Quick Response Times</div>
          <div style="font-size:13px;color:var(--gray);line-height:1.9">WhatsApp: usually within 2 hours<br>Email: within 24 hours<br>Calls: Mon–Sat, 9AM–7PM IST</div>
        </div>
      </div>
    </div>
    <p class="text-center" style="margin-top:40px;color:var(--gray);font-size:14px">📍 Based in Karnataka, India. Serving clients Pan-India and globally.</p>
  </div>
</section>

<section id="faq" class="section" style="background:var(--white)">
  <div class="container">
    <div class="text-center">
      <h2 class="section-title">Frequently Asked <span class="accent">Questions</span></h2>
      <p class="section-sub">Got questions? We've got answers.</p>
    </div>
    <div class="faq-wrap" id="faq-list"></div>
  </div>
</section>
'''

# ---------------- PRICING ----------------
PRICING_BODY = ph('Simple, Transparent <span class="accent">Pricing</span>',
                  'No hidden fees. No long-term contracts. Just results.', 'Pricing') + '''
<section class="section">
  <div class="container">
    <div class="pricing-tabs">
      <button class="pricing-tab active" onclick="switchTab('content',this)">📱 Content Management</button>
      <button class="pricing-tab" onclick="switchTab('courses',this)">🎓 Courses</button>
      <button class="pricing-tab" onclick="switchTab('yt',this)">▶ YouTube Packages</button>
      <button class="pricing-tab" onclick="switchTab('onetime',this)">⚡ One-Time Services</button>
    </div>
    <div class="pricing-panel active" id="panel-content"></div>
    <div class="pricing-panel" id="panel-courses"></div>
    <div class="pricing-panel" id="panel-yt"></div>
    <div class="pricing-panel" id="panel-onetime"></div>
  </div>
</section>

<section id="faq" class="section" style="background:var(--white)">
  <div class="container">
    <div class="text-center">
      <h2 class="section-title">Pricing <span class="accent">FAQs</span></h2>
    </div>
    <div class="faq-wrap" id="faq-list"></div>
  </div>
</section>
'''

pages = {
    'src/static/index.html': page(
        "Alevoor Technologies | Where Technology Meets Growth",
        "Alevoor Technologies builds software, scales creators, and powers businesses across India. Software development, content management, digital marketing & courses.",
        HOME_BODY),
    'src/static/about.html': page(
        "About Us — Alevoor Technologies",
        "Learn about Alevoor Technologies — our mission, vision, values, founder Rishabh Alevoor, team, and the RR Creator Lab ecosystem.",
        ABOUT_BODY),
    'src/static/services.html': page(
        "Services & Courses — Alevoor Technologies",
        "Explore Alevoor Technologies services — custom software, websites, digital marketing, content & social — plus our practical courses.",
        SERVICES_BODY),
    'src/static/portfolio.html': page(
        "Portfolio & Gallery — Alevoor Technologies",
        "See real case studies and creative work from Alevoor Technologies — proven results across YouTube, Instagram, and business content.",
        PORTFOLIO_BODY),
    'src/static/contact.html': page(
        "Contact — Alevoor Technologies",
        "Get in touch with Alevoor Technologies. WhatsApp, email, Instagram, or book a free 30-minute consultation.",
        CONTACT_BODY),
    'src/static/pricing.html': page(
        "Pricing — Alevoor Technologies",
        "Transparent pricing for content management, courses, YouTube packages, and one-time services from Alevoor Technologies.",
        PRICING_BODY),
}
for path, html in pages.items():
    open(path, 'w').write(html)
    print('wrote', path, len(html))
