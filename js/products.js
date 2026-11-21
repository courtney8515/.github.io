/* ==========================================================================
   RoBella — Catalog data
   --------------------------------------------------------------------------
   IMPORTANT: Every product below is SAMPLE / DEMO content, used only so the
   storefront can be previewed. Names, prices and offers are placeholders and
   do not represent real RoBella inventory. Replace this file (or load the
   same shape from a backend) when the real catalog is ready.

   Product shape:
     id          unique string
     name        display name
     category    one of the keys in ROBELLA.categories
     section     one of that category's section ids
     price       current selling price (number, USD)
     compareAt   optional original price — only set when an item is on offer
     saleSection optional Sale-page section id (see ROBELLA.saleSections)
     isNew       optional — shown in "New Arrivals" on the homepage
     badge       optional short label ("New", "Offer", "Favorite")
     description short description
     image, alt  image path and alt text
     demo        true for sample data (shows a "Sample" tag on cards)
   ========================================================================== */
(function () {
  "use strict";

  var IMG = "assets/images/";

  var categories = {
    clothing: {
      name: "Clothing",
      url: "Clothing.html",
      sections: [
        { id: "new-arrivals", name: "New Arrivals", blurb: "Fresh styles, just in — the newest additions to the RoBella wardrobe." },
        { id: "everyday-essentials", name: "Everyday Essentials", blurb: "Easy, versatile pieces you will reach for again and again." },
        { id: "dresses-tops", name: "Dresses & Tops", blurb: "Effortless dresses and pretty tops for every occasion." },
        { id: "seasonal-styles", name: "Seasonal Styles", blurb: "Layers and textures made for the season ahead." },
        { id: "clothing-favorites", name: "Clothing Favorites", blurb: "The pieces our shoppers love most." }
      ]
    },
    accessories: {
      name: "Accessories",
      url: "Accessories.html",
      sections: [
        { id: "jewelry", name: "Jewelry", blurb: "Delicate gold, soft pearls and pieces made for layering." },
        { id: "handbags", name: "Handbags & Purses", blurb: "Beautiful bags to carry every day — and every adventure." },
        { id: "sunglasses", name: "Sunglasses", blurb: "Timeless frames that finish a look in an instant." },
        { id: "everyday-accessories", name: "Everyday Accessories", blurb: "Small details that make getting dressed a joy." },
        { id: "gifts-special-finds", name: "Gifts & Special Finds", blurb: "Thoughtful treasures, ready to give." }
      ]
    },
    "home-goods": {
      name: "Home Goods",
      url: "Home%20Goods.html",
      sections: [
        { id: "home-decor", name: "Home Décor", blurb: "Sculptural pieces that bring warmth and character to any room." },
        { id: "kitchen-dining", name: "Kitchen & Dining", blurb: "Everyday tableware made a little more beautiful." },
        { id: "decorative-accents", name: "Decorative Accents", blurb: "The finishing touches that make a space feel like yours." },
        { id: "cozy-living", name: "Cozy Living", blurb: "Soft textures and candlelight for slow, restful evenings." },
        { id: "gifts-for-home", name: "Gifts for the Home", blurb: "Charming finds for housewarmings and hosts." }
      ]
    },
    toys: {
      name: "Toys",
      url: "Toys.html",
      sections: [
        { id: "educational-toys", name: "Educational Toys", blurb: "Playful learning for curious little minds." },
        { id: "creative-play", name: "Creative Play", blurb: "Colors, clay and imagination — let them create." },
        { id: "games-activities", name: "Games & Activities", blurb: "Games to gather around, for the whole family." },
        { id: "plush-favorites", name: "Plush & Playful Favorites", blurb: "Soft, huggable companions for every adventure." },
        { id: "gifts-little-ones", name: "Gifts for Little Ones", blurb: "Heirloom-worthy gifts that spark big smiles." }
      ]
    },
    electronics: {
      name: "Electronics",
      url: "Electronics.html",
      sections: [
        { id: "personal-electronics", name: "Personal Electronics", blurb: "Thoughtfully designed tech for your everyday rhythm." },
        { id: "tech-accessories", name: "Tech Accessories", blurb: "Useful extras that make your devices work for you." },
        { id: "charging-connectivity", name: "Charging & Connectivity", blurb: "Stay powered and connected, beautifully." },
        { id: "everyday-gadgets", name: "Everyday Gadgets", blurb: "Clever little helpers for home, desk and on the go." },
        { id: "technology-favorites", name: "Technology Favorites", blurb: "The smart finds our shoppers love most." }
      ]
    }
  };

  var saleSections = [
    { id: "featured-offers", name: "Featured Offers", blurb: "Our favorite finds, now at special prices." },
    { id: "clothing-offers", name: "Clothing Offers", blurb: "Wardrobe favorites with a little something off." },
    { id: "accessories-offers", name: "Accessories Offers", blurb: "Finishing touches at finishing-touch prices." },
    { id: "home-lifestyle-offers", name: "Home & Lifestyle Offers", blurb: "Special prices on home, play and everyday tech." },
    { id: "last-chance", name: "Last-Chance Finds", blurb: "Final pieces — once they are gone, they are gone." }
  ];

  function p(o) { o.demo = true; return o; }

  var products = [
    /* ---------------- Clothing ---------------- */
    p({ id: "c-ivory-knit", name: "Ivory Cable-Knit Sweater", category: "clothing", section: "new-arrivals", price: 48, isNew: true, badge: "New",
        description: "A soft, cozy cable-knit in warm ivory — the sweater you will live in all season.",
        image: IMG + "p-ivory-cable-knit-sweater.jpg", alt: "Woman wearing a chunky ivory cable-knit sweater" }),
    p({ id: "c-linen-dress", name: "Linen Day Dress", category: "clothing", section: "new-arrivals", price: 58, isNew: true, badge: "New",
        description: "A relaxed, breathable linen dress with an easy silhouette for warm days.",
        image: IMG + "p-linen-day-dress.jpg", alt: "Woman posing in a simple neutral linen dress" }),
    p({ id: "c-white-tee", name: "Classic White Tee", category: "clothing", section: "everyday-essentials", price: 22,
        description: "The perfect crew-neck tee in crisp white — a wardrobe foundation.",
        image: IMG + "p-classic-white-tee.jpg", alt: "Plain white crew-neck t-shirt on a hanger" }),
    p({ id: "c-button-up", name: "Relaxed Button-Up Shirt", category: "clothing", section: "everyday-essentials", price: 36,
        description: "An airy long-sleeve shirt that layers beautifully or stands alone.",
        image: IMG + "p-relaxed-button-up-shirt.jpg", alt: "White long-sleeve shirt on a white clothes hanger" }),
    p({ id: "c-floral-sundress", name: "Floral Sundress", category: "clothing", section: "dresses-tops", price: 54, compareAt: 64, saleSection: "clothing-offers", badge: "Offer",
        description: "A romantic floral print with a flowing skirt — made for sunny afternoons.",
        image: IMG + "p-floral-sundress.jpg", alt: "Woman in a floral sundress standing outdoors" }),
    p({ id: "c-poppy-dress", name: "Poppy Red Day Dress", category: "clothing", section: "dresses-tops", price: 52,
        description: "A cheerful red dress with a flattering waist and easy movement.",
        image: IMG + "p-garden-party-dress.jpg", alt: "Woman in a red day dress standing against a white wall" }),
    p({ id: "c-camel-coat", name: "Camel Wool-Blend Coat", category: "clothing", section: "seasonal-styles", price: 98, compareAt: 128, saleSection: "featured-offers", badge: "Offer",
        description: "A timeless camel coat with a tailored shape for crisp days.",
        image: IMG + "p-camel-wool-coat.jpg", alt: "Woman in a camel coat and gray trousers on a white staircase" }),
    p({ id: "c-knit-cardigan", name: "Cozy Knit Cardigan", category: "clothing", section: "seasonal-styles", price: 46, isNew: true, badge: "New",
        description: "A textured knit cardigan in a warm neutral tone — layering made lovely.",
        image: IMG + "p-cozy-knit-cardigan.jpg", alt: "Close-up of a woman in a brown textured knit sweater" }),
    p({ id: "c-blazer-set", name: "Tailored Blazer Set", category: "clothing", section: "clothing-favorites", price: 88, badge: "Favorite",
        description: "A polished blazer and trouser set that moves from desk to dinner.",
        image: IMG + "p-tailored-blazer-set.jpg", alt: "Person in a tailored blazer and trousers with a hand in a pocket" }),
    p({ id: "c-denim-jacket", name: "Everyday Denim Jacket", category: "clothing", section: "clothing-favorites", price: 62, compareAt: 72, saleSection: "clothing-offers", badge: "Offer",
        description: "A classic mid-wash denim jacket that goes with absolutely everything.",
        image: IMG + "p-everyday-denim-jacket.jpg", alt: "Woman in a white tee and blue denim jacket looking down" }),

    /* ---------------- Accessories ---------------- */
    p({ id: "a-gold-hoops", name: "Twisted Gold Hoops", category: "accessories", section: "jewelry", price: 28, isNew: true, badge: "New",
        description: "Sculptural twisted hoops with a warm golden finish.",
        image: IMG + "p-twisted-gold-hoops.jpg", alt: "Two gold twisted hoop earrings resting on white stones" }),
    p({ id: "a-charm-bracelets", name: "Charm Bracelet Trio", category: "accessories", section: "jewelry", price: 34, compareAt: 42, saleSection: "accessories-offers", badge: "Offer",
        description: "Three delicate chain bracelets with tiny charms — wear together or apart.",
        image: IMG + "p-charm-bracelet-trio.jpg", alt: "Three delicate gold bracelets with charms on a white background" }),
    p({ id: "a-pearl-necklace", name: "Pearl Strand Necklace", category: "accessories", section: "jewelry", price: 42,
        description: "A classic strand of lustrous pearls for effortless elegance.",
        image: IMG + "p-pearl-strand-necklace.jpg", alt: "White pearl necklace on gray fabric" }),
    p({ id: "a-quilted-bag", name: "Quilted Shoulder Bag", category: "accessories", section: "handbags", price: 68, badge: "Favorite",
        description: "A soft quilted bag in a neutral hue with a charming finish.",
        image: IMG + "p-quilted-shoulder-bag.jpg", alt: "Woman holding a quilted beige handbag with a charm" }),
    p({ id: "a-ivory-purse", name: "Ivory Structured Purse", category: "accessories", section: "handbags", price: 64, compareAt: 78, saleSection: "featured-offers", badge: "Offer",
        description: "A structured top-handle purse in creamy ivory — polished and timeless.",
        image: IMG + "p-ivory-structured-purse.jpg", alt: "White structured purse on a table" }),
    p({ id: "a-straw-tote", name: "Woven Straw Tote", category: "accessories", section: "handbags", price: 38, isNew: true, badge: "New",
        description: "A woven tote for market mornings and beach afternoons.",
        image: IMG + "p-woven-straw-tote.jpg", alt: "Woven straw bag hanging on a wall" }),
    p({ id: "a-black-sunglasses", name: "Classic Black Sunglasses", category: "accessories", section: "sunglasses", price: 26,
        description: "Bold, timeless black frames that suit every face.",
        image: IMG + "p-classic-black-sunglasses.jpg", alt: "Black sunglasses on a white surface" }),
    p({ id: "a-aviators", name: "Gold Aviator Sunglasses", category: "accessories", section: "sunglasses", price: 32, compareAt: 38, saleSection: "last-chance", badge: "Offer",
        description: "Light gold aviators with a retro feel.",
        image: IMG + "p-gold-aviator-sunglasses.jpg", alt: "Gold-framed aviator-style sunglasses" }),
    p({ id: "a-hair-clip", name: "Golden Hair Clip", category: "accessories", section: "everyday-accessories", price: 16,
        description: "A polished golden clip for effortless up-dos.",
        image: IMG + "p-golden-hair-clip.jpg", alt: "Golden hair clip on a white table" }),
    p({ id: "a-knit-scarf", name: "Chunky Knit Scarf", category: "accessories", section: "everyday-accessories", price: 30,
        description: "A generously sized knit scarf in a soft neutral tone.",
        image: IMG + "p-chunky-knit-scarf.jpg", alt: "Knitted scarf draped over a shelf beside dried wheat stems" }),
    p({ id: "a-sun-hat", name: "Ribboned Sun Hat", category: "accessories", section: "gifts-special-finds", price: 36,
        description: "A crisp white hat with a black ribbon band — a romantic gift.",
        image: IMG + "p-ribboned-sun-hat.jpg", alt: "White hat with a black ribbon beside a bouquet of flowers" }),
    p({ id: "a-ring-set", name: "Gift-Boxed Ring Set", category: "accessories", section: "gifts-special-finds", price: 40,
        description: "Three stackable golden rings, presented in a keepsake box.",
        image: IMG + "p-gift-boxed-ring-set.jpg", alt: "Three gold rings in a white gift box" }),

    /* ---------------- Home Goods ---------------- */
    p({ id: "h-ceramic-vase", name: "Sculpted Ceramic Vase", category: "home-goods", section: "home-decor", price: 44, isNew: true, badge: "New",
        description: "An earthy, hand-finished vase that stands beautifully on its own.",
        image: IMG + "p-sculpted-ceramic-vase.jpg", alt: "Brown ceramic vase on a table" }),
    p({ id: "h-wood-frame", name: "Natural Wood Frame", category: "home-goods", section: "home-decor", price: 28,
        description: "A warm wooden frame to showcase your favorite memories.",
        image: IMG + "p-natural-wood-frame.jpg", alt: "Wooden picture frame on a white wall" }),
    p({ id: "h-stoneware-mug", name: "Stoneware Mug", category: "home-goods", section: "kitchen-dining", price: 18,
        description: "A simple, satisfying mug for slow morning coffee.",
        image: IMG + "p-stoneware-mug.jpg", alt: "White ceramic mugs on a white table" }),
    p({ id: "h-place-setting", name: "Dinnerware Place Setting", category: "home-goods", section: "kitchen-dining", price: 56, compareAt: 68, saleSection: "home-lifestyle-offers", badge: "Offer",
        description: "A clean, classic place setting for everyday dinners and gatherings.",
        image: IMG + "p-dinnerware-place-setting.jpg", alt: "White ceramic dinner plate set on a wooden table" }),
    p({ id: "h-serving-board", name: "Wooden Serving Board", category: "home-goods", section: "kitchen-dining", price: 34,
        description: "A smooth wooden board for cheese, charcuterie and pretty presentations.",
        image: IMG + "p-wooden-serving-board.jpg", alt: "Brown wooden tray on a wooden table" }),
    p({ id: "h-bud-vase", name: "Amber Bud Vase", category: "home-goods", section: "decorative-accents", price: 22,
        description: "An amber glass bottle vase for a single stem or a few dried blooms.",
        image: IMG + "p-amber-bud-vase.jpg", alt: "White flowers in a brown glass bottle" }),
    p({ id: "h-candle-holder", name: "Glass Candle Holder", category: "home-goods", section: "decorative-accents", price: 24, compareAt: 30, saleSection: "last-chance", badge: "Offer",
        description: "A softly glowing glass holder that sets an inviting mood.",
        image: IMG + "p-glass-candle-holder.jpg", alt: "White and brown candle holder" }),
    p({ id: "h-throw-pillow", name: "Textured Throw Pillow", category: "home-goods", section: "cozy-living", price: 32, isNew: true, badge: "New",
        description: "A plush, textured pillow in soft white for the coziest corners.",
        image: IMG + "p-textured-throw-pillow.jpg", alt: "White throw pillow on a gray sofa" }),
    p({ id: "h-jar-candle", name: "Glass Jar Candle", category: "home-goods", section: "cozy-living", price: 26,
        description: "A clean-burning candle in a clear glass jar for calm evenings.",
        image: IMG + "p-glass-jar-candle.jpg", alt: "Lit white candle in a clear glass holder" }),
    p({ id: "h-gift-set", name: "Candle & Book Gift Set", category: "home-goods", section: "gifts-for-home", price: 48, badge: "Favorite",
        description: "A cozy pairing for slow weekends — beautifully gift-ready.",
        image: IMG + "p-candle-book-gift-set.jpg", alt: "A candle and an open book resting on a blanket" }),
    p({ id: "h-bowl-set", name: "Ceramic Bowl Set", category: "home-goods", section: "gifts-for-home", price: 38, compareAt: 46, saleSection: "featured-offers", badge: "Offer",
        description: "Nesting ceramic bowls in warm neutral glazes.",
        image: IMG + "p-ceramic-bowl-set.jpg", alt: "White and brown ceramic bowls" }),

    /* ---------------- Toys ---------------- */
    p({ id: "t-alphabet-train", name: "Wooden Alphabet Train", category: "toys", section: "educational-toys", price: 34, isNew: true, badge: "New",
        description: "Colorful wooden letters on wheels — learning the ABCs, one carriage at a time.",
        image: IMG + "p-wooden-alphabet-train.jpg", alt: "Colorful wooden alphabet letters on toy train wheels" }),
    p({ id: "t-elephant-stackers", name: "Wooden Elephant Stackers", category: "toys", section: "educational-toys", price: 24,
        description: "Charming wooden elephants for stacking, sorting and storytelling.",
        image: IMG + "p-wooden-elephant-stackers.jpg", alt: "Three wooden elephants on a yellow background" }),
    p({ id: "t-rainbow-clay", name: "Rainbow Clay Set", category: "toys", section: "creative-play", price: 20,
        description: "Soft, colorful clay for little sculptors and big imaginations.",
        image: IMG + "p-rainbow-clay-set.jpg", alt: "Rainbow made of colorful clay" }),
    p({ id: "t-crayon-box", name: "Little Artist Crayon Box", category: "toys", section: "creative-play", price: 14, compareAt: 18, saleSection: "home-lifestyle-offers", badge: "Offer",
        description: "A bright box of crayons, ready for masterpieces.",
        image: IMG + "p-little-artist-crayon-box.jpg", alt: "Crayons in a yellow box" }),
    p({ id: "t-board-game", name: "Family Board Game", category: "toys", section: "games-activities", price: 28,
        description: "A classic race-to-home board game for game night.",
        image: IMG + "p-family-board-game.jpg", alt: "Colorful board game set up on a table" }),
    p({ id: "t-jigsaw", name: "Picture Jigsaw Puzzle", category: "toys", section: "games-activities", price: 22,
        description: "A satisfying puzzle to piece together, together.",
        image: IMG + "p-jigsaw-puzzle.jpg", alt: "Hand holding a jigsaw puzzle piece over a puzzle" }),
    p({ id: "t-teddy-bear", name: "Classic Teddy Bear", category: "toys", section: "plush-favorites", price: 30, badge: "Favorite",
        description: "A soft, cuddly bear with a dapper bow tie.",
        image: IMG + "p-classic-teddy-bear.jpg", alt: "Brown teddy bear with a bow tie" }),
    p({ id: "t-bunny-plush", name: "Blush Bunny Plush", category: "toys", section: "plush-favorites", price: 26, isNew: true, badge: "New",
        description: "A sweet dusty-pink bunny that is ready for snuggles.",
        image: IMG + "p-blush-bunny-plush.jpg", alt: "Dusty pink bunny stuffed animal sitting by a window" }),
    p({ id: "t-block-basket", name: "Wooden Block Basket", category: "toys", section: "gifts-little-ones", price: 42,
        description: "A basket of painted wooden blocks for building tiny towns.",
        image: IMG + "p-wooden-block-basket.jpg", alt: "Bowl filled with colorful wooden toy blocks shaped like buildings and cars" }),
    p({ id: "t-ride-on", name: "Wooden Ride-On Animal", category: "toys", section: "gifts-little-ones", price: 78, compareAt: 92, saleSection: "last-chance", badge: "Offer",
        description: "A heirloom-style ride-on toy for little explorers.",
        image: IMG + "p-wooden-ride-on-animal.jpg", alt: "White and brown wooden ride-on animal toy" }),

    /* ---------------- Electronics ---------------- */
    p({ id: "e-over-ear", name: "Wireless Over-Ear Headphones", category: "electronics", section: "personal-electronics", price: 89, isNew: true, badge: "New",
        description: "Comfortable over-ear headphones for music, calls and quiet focus.",
        image: IMG + "p-wireless-over-ear-headphones.jpg", alt: "Black wireless headphones on a white table" }),
    p({ id: "e-smartwatch", name: "Everyday Smartwatch", category: "electronics", section: "personal-electronics", price: 119,
        description: "Track your day, your steps and your notifications at a glance.",
        image: IMG + "p-everyday-smartwatch.jpg", alt: "Smartwatch with a dark textured band and colorful display" }),
    p({ id: "e-tablet-case", name: "Tablet Stand Case", category: "electronics", section: "tech-accessories", price: 32,
        description: "A protective folio case that doubles as a stand.",
        image: IMG + "p-tablet-stand-case.jpg", alt: "Tablet in a black case on a yellow surface" }),
    p({ id: "e-wired-headphones", name: "Studio Wired Headphones", category: "electronics", section: "tech-accessories", price: 48, compareAt: 58, saleSection: "home-lifestyle-offers", badge: "Offer",
        description: "Classic corded headphones with warm, balanced sound.",
        image: IMG + "p-studio-wired-headphones.jpg", alt: "Gray and brown corded headphones" }),
    p({ id: "e-charging-pad", name: "Wireless Charging Pad", category: "electronics", section: "charging-connectivity", price: 29,
        description: "Set it down and power up — no tangled cords.",
        image: IMG + "p-wireless-charging-pad.jpg", alt: "Smartphone resting on a wireless charging pad" }),
    p({ id: "e-usb-cables", name: "Braided USB Cable Set", category: "electronics", section: "charging-connectivity", price: 18,
        description: "Durable braided cables in multiple lengths.",
        image: IMG + "p-braided-usb-cable-set.jpg", alt: "Black and white USB data cables" }),
    p({ id: "e-desk-fan", name: "Mini Desk Fan", category: "electronics", section: "everyday-gadgets", price: 24, isNew: true, badge: "New",
        description: "A compact, quiet fan for your desk or nightstand.",
        image: IMG + "p-mini-desk-fan.jpg", alt: "Small gray and white desk fan on a white surface" }),
    p({ id: "e-ring-light", name: "LED Ring Light", category: "electronics", section: "everyday-gadgets", price: 36,
        description: "Soft, flattering light for video calls and photos.",
        image: IMG + "p-led-ring-light.jpg", alt: "Close-up of an LED ring light on a table" }),
    p({ id: "e-speaker", name: "Portable Speaker", category: "electronics", section: "technology-favorites", price: 58, badge: "Favorite",
        description: "Big sound in a compact, travel-ready speaker.",
        image: IMG + "p-portable-speaker.jpg", alt: "Black and silver portable speaker" }),
    p({ id: "e-power-bank", name: "Compact Power Bank", category: "electronics", section: "technology-favorites", price: 34, compareAt: 42, saleSection: "home-lifestyle-offers", badge: "Offer",
        description: "Slim backup power for long days out.",
        image: IMG + "p-compact-power-bank.jpg", alt: "Smartphone beside a compact power bank" })
  ];

  window.ROBELLA = window.ROBELLA || {};
  window.ROBELLA.categories = categories;
  window.ROBELLA.saleSections = saleSections;
  window.ROBELLA.products = products;
  window.ROBELLA.catalogIsDemo = products.every(function (x) { return x.demo; });
})();
