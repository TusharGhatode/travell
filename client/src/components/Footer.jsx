import React from 'react'

const Footer = () => {
  return (
    <div>
          <footer class="footer bg-red-500">
        <div class="footer-top w-full">
          <div class="container">
            <div class="footer-brand">
              <a href="#" class="logo">
                <img src="/logo.svg" alt="Tourly logo" />
              </a>

              <p class="footer-text">
                Urna ratione ante harum provident, eleifend, vulputate molestiae
                proin fringilla, praesentium magna conubia at perferendis,
                pretium, aenean aut ultrices.
              </p>
            </div>

            <div class="footer-contact">
              <h4 class="contact-title">Contact Us</h4>

              <p class="contact-text">Feel free to contact and reach us !!</p>

              <ul>
                <li class="contact-item">
                  <ion-icon name="call-outline"></ion-icon>

                  <a href="tel:+01123456790" class="contact-link">
                    +01 (123) 4567 90
                  </a>
                </li>

                <li class="contact-item">
                  <ion-icon name="mail-outline"></ion-icon>

                  <a href="mailto:info.tourly.com" class="contact-link">
                    info.tourly.com
                  </a>
                </li>

                <li class="contact-item">
                  <ion-icon name="location-outline"></ion-icon>

                  <address>3146 Koontz, California</address>
                </li>
              </ul>
            </div>

            <div class="footer-form">
              <p class="form-text">
                Subscribe our newsletter for more update & news !!
              </p>

              <form action="" class="form-wrapper">
                <input
                  type="email"
                  name="email"
                  class="input-field"
                  placeholder="Enter Your Email"
                  required
                />

                <button type="submit" class="btn btn-secondary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer