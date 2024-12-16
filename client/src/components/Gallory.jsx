import React from 'react'

const Gallory = () => {
  return (
    <div>
        

        <section class="gallery" id="gallery">
            <div class="container">
              <p class="section-subtitle">Photo Gallery</p>

              <h2 class="h2 section-title">Photo's From Travellers</h2>

              <p class="section-text">
                Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
                nemo, rutrum. Vestibulum cumque laudantium. Sit ornare mollitia
                tenetur, aptent.
              </p>

              <ul class="gallery-list">
                <li class="gallery-item">
                  <figure class="gallery-image">
                    <img
                      src="./assets/images/gallery-1.jpg"
                      alt="Gallery image"
                    />
                  </figure>
                </li>

                <li class="gallery-item">
                  <figure class="gallery-image">
                    <img
                      src="./assets/images/gallery-2.jpg"
                      alt="Gallery image"
                    />
                  </figure>
                </li>

                <li class="gallery-item">
                  <figure class="gallery-image">
                    <img
                      src="./assets/images/gallery-3.jpg"
                      alt="Gallery image"
                    />
                  </figure>
                </li>

                <li class="gallery-item">
                  <figure class="gallery-image">
                    <img
                      src="./assets/images/gallery-4.jpg"
                      alt="Gallery image"
                    />
                  </figure>
                </li>

                <li class="gallery-item">
                  <figure class="gallery-image">
                    <img
                      src="./assets/images/gallery-5.jpg"
                      alt="Gallery image"
                    />
                  </figure>
                </li>
              </ul>
            </div>
          </section>
    </div>
  )
}

export default Gallory