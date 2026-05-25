# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> SEARCH-02: fictional city shows no-results message
- Location: tests/search.spec.ts:17:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('no-results')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('no-results')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - link "BUNKLY" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: BUNKLY
          - generic [ref=e8]: Established • MMXXVI
        - navigation [ref=e9]:
          - link "The Houses" [ref=e10] [cursor=pointer]:
            - /url: /search
          - link "Destinations" [ref=e11] [cursor=pointer]:
            - /url: /search
          - link "The House" [ref=e12] [cursor=pointer]:
            - /url: /about
          - link "Concierge" [ref=e13] [cursor=pointer]:
            - /url: /help
          - generic [ref=e14]: ✦
          - link "Messages" [ref=e15] [cursor=pointer]:
            - /url: /messages
            - img [ref=e16]
            - text: Messages
          - link "Wishlists" [ref=e18] [cursor=pointer]:
            - /url: /account/wishlists
            - img [ref=e19]
            - text: Wishlists
          - link "Notices" [ref=e21] [cursor=pointer]:
            - /url: /account/notifications
            - img [ref=e22]
            - text: Notices
          - link "My Voyages" [ref=e25] [cursor=pointer]:
            - /url: /bookings
          - link "Account" [ref=e26] [cursor=pointer]:
            - /url: /account
            - img [ref=e27]
            - text: Account
          - link "Reserve a Suite" [ref=e30] [cursor=pointer]:
            - /url: /login
    - main [ref=e31]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - text: Destination
          - textbox "Destination" [ref=e36]:
            - /placeholder: Where shall we go?
        - generic [ref=e37]:
          - text: Arrival
          - textbox "Arrival" [ref=e38]: 2026-08-23
        - generic [ref=e39]:
          - text: Departure
          - textbox "Departure" [ref=e40]: 2026-08-26
        - generic [ref=e41]:
          - text: Guests
          - spinbutton "Guests" [ref=e42]: "2"
        - button "Enquire ✦" [ref=e43] [cursor=pointer]
      - generic [ref=e45]:
        - complementary [ref=e47]:
          - generic [ref=e48]:
            - heading "Sort By" [level=3] [ref=e49]
            - combobox [ref=e50]:
              - option "Relevance" [selected]
              - 'option "Price: Low to High"'
              - 'option "Price: High to Low"'
              - option "Highest Rated"
          - generic [ref=e51]:
            - heading "Price Range" [level=3] [ref=e52]
            - generic [ref=e53]:
              - generic [ref=e54]:
                - generic [ref=e55]: Minimum price
                - spinbutton "Minimum price" [ref=e56]
              - generic [ref=e57]: —
              - generic [ref=e58]:
                - generic [ref=e59]: Maximum price
                - spinbutton "Maximum price" [ref=e60]
          - generic [ref=e61]:
            - heading "Star Rating" [level=3] [ref=e62]
            - generic [ref=e63]:
              - generic [ref=e64] [cursor=pointer]:
                - checkbox "5 stars" [ref=e65]
                - generic [ref=e66]:
                  - img [ref=e67]
                  - img [ref=e69]
                  - img [ref=e71]
                  - img [ref=e73]
                  - img [ref=e75]
                - generic [ref=e77]: 5 stars
              - generic [ref=e78] [cursor=pointer]:
                - checkbox "4 stars" [ref=e79]
                - generic [ref=e80]:
                  - img [ref=e81]
                  - img [ref=e83]
                  - img [ref=e85]
                  - img [ref=e87]
                - generic [ref=e89]: 4 stars
              - generic [ref=e90] [cursor=pointer]:
                - checkbox "3 stars" [ref=e91]
                - generic [ref=e92]:
                  - img [ref=e93]
                  - img [ref=e95]
                  - img [ref=e97]
                - generic [ref=e99]: 3 stars
              - generic [ref=e100] [cursor=pointer]:
                - checkbox "2 stars" [ref=e101]
                - generic [ref=e102]:
                  - img [ref=e103]
                  - img [ref=e105]
                - generic [ref=e107]: 2 stars
          - generic [ref=e108]:
            - heading "Property Type" [level=3] [ref=e109]
            - generic [ref=e110]:
              - generic [ref=e111] [cursor=pointer]:
                - checkbox "Hotel" [ref=e112]
                - generic [ref=e113]: Hotel
              - generic [ref=e114] [cursor=pointer]:
                - checkbox "Resort" [ref=e115]
                - generic [ref=e116]: Resort
              - generic [ref=e117] [cursor=pointer]:
                - checkbox "Boutique" [ref=e118]
                - generic [ref=e119]: Boutique
              - generic [ref=e120] [cursor=pointer]:
                - checkbox "B&B" [ref=e121]
                - generic [ref=e122]: B&B
              - generic [ref=e123] [cursor=pointer]:
                - checkbox "Hostel" [ref=e124]
                - generic [ref=e125]: Hostel
              - generic [ref=e126] [cursor=pointer]:
                - checkbox "Vacation Rental" [ref=e127]
                - generic [ref=e128]: Vacation Rental
          - generic [ref=e129]:
            - heading "Amenities" [level=3] [ref=e130]
            - generic [ref=e131]:
              - generic [ref=e132] [cursor=pointer]:
                - checkbox "Pool" [ref=e133]
                - img [ref=e135]
                - generic [ref=e139]: Pool
              - generic [ref=e140] [cursor=pointer]:
                - checkbox "Breakfast" [ref=e141]
                - img [ref=e143]
                - generic [ref=e145]: Breakfast
              - generic [ref=e146] [cursor=pointer]:
                - checkbox "Parking" [ref=e147]
                - img [ref=e149]
                - generic [ref=e153]: Parking
              - generic [ref=e154] [cursor=pointer]:
                - checkbox "Fitness" [ref=e155]
                - img [ref=e157]
                - generic [ref=e163]: Fitness
              - generic [ref=e164] [cursor=pointer]:
                - checkbox "Spa" [ref=e165]
                - img [ref=e167]
                - generic [ref=e170]: Spa
              - generic [ref=e171] [cursor=pointer]:
                - checkbox "WiFi" [ref=e172]
                - img [ref=e174]
                - generic [ref=e178]: WiFi
              - generic [ref=e179] [cursor=pointer]:
                - checkbox "Pet Friendly" [ref=e180]
                - img [ref=e182]
                - generic [ref=e186]: Pet Friendly
        - generic [ref=e188]:
          - paragraph [ref=e189]: 9 properties found
          - link "Bunkly Lodge Tokyo hotel Bunkly Lodge Tokyo Tokyo, Japan 4.9 (134) Modern Japanese hospitality meets cutting-edge design in the heart of Tokyo. Features an onsen-inspired spa, rooftop bar with Skytree views, and Michelin-starred dining. breakfast fitness spa restaurant wifi strict cancellation $325 / night" [ref=e190] [cursor=pointer]:
            - /url: /properties/bunkly-lodge-tokyo?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e193]:
              - generic [ref=e194]:
                - img "Bunkly Lodge Tokyo" [ref=e195]
                - generic [ref=e196]: hotel
              - generic [ref=e197]:
                - generic [ref=e198]:
                  - generic [ref=e199]:
                    - generic [ref=e200]:
                      - heading "Bunkly Lodge Tokyo" [level=3] [ref=e201]
                      - paragraph [ref=e202]:
                        - img [ref=e203]
                        - text: Tokyo, Japan
                    - generic [ref=e206]:
                      - img [ref=e207]
                      - generic [ref=e209]: "4.9"
                      - generic [ref=e210]: (134)
                  - paragraph [ref=e211]: Modern Japanese hospitality meets cutting-edge design in the heart of Tokyo. Features an onsen-inspired spa, rooftop bar with Skytree views, and Michelin-starred dining.
                  - generic [ref=e212]:
                    - generic [ref=e213]:
                      - img [ref=e214]
                      - generic [ref=e216]: breakfast
                    - generic [ref=e217]:
                      - img [ref=e218]
                      - generic [ref=e224]: fitness
                    - generic [ref=e225]:
                      - img [ref=e226]
                      - generic [ref=e229]: spa
                    - generic [ref=e231]: restaurant
                    - generic [ref=e232]:
                      - img [ref=e233]
                      - generic [ref=e237]: wifi
                - generic [ref=e238]:
                  - generic [ref=e239]: strict cancellation
                  - generic [ref=e240]: $325 / night
          - link "Bunkly Resort & Spa Bali resort Bunkly Resort & Spa Bali Ubud, Indonesia 4.5 (140) Nestled among Bali's iconic rice terraces, this luxury resort offers private pool villas, world-class spa treatments, and authentic Balinese hospitality. A true tropical paradise. pool breakfast parking fitness spa moderate cancellation $455 / night" [ref=e241] [cursor=pointer]:
            - /url: /properties/bunkly-resort-spa-bali?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e244]:
              - generic [ref=e245]:
                - img "Bunkly Resort & Spa Bali" [ref=e246]
                - generic [ref=e247]: resort
              - generic [ref=e248]:
                - generic [ref=e249]:
                  - generic [ref=e250]:
                    - generic [ref=e251]:
                      - heading "Bunkly Resort & Spa Bali" [level=3] [ref=e252]
                      - paragraph [ref=e253]:
                        - img [ref=e254]
                        - text: Ubud, Indonesia
                    - generic [ref=e257]:
                      - img [ref=e258]
                      - generic [ref=e260]: "4.5"
                      - generic [ref=e261]: (140)
                  - paragraph [ref=e262]: Nestled among Bali's iconic rice terraces, this luxury resort offers private pool villas, world-class spa treatments, and authentic Balinese hospitality. A true tropical paradise.
                  - generic [ref=e263]:
                    - generic [ref=e264]:
                      - img [ref=e265]
                      - generic [ref=e269]: pool
                    - generic [ref=e270]:
                      - img [ref=e271]
                      - generic [ref=e273]: breakfast
                    - generic [ref=e274]:
                      - img [ref=e275]
                      - generic [ref=e279]: parking
                    - generic [ref=e280]:
                      - img [ref=e281]
                      - generic [ref=e287]: fitness
                    - generic [ref=e288]:
                      - img [ref=e289]
                      - generic [ref=e292]: spa
                - generic [ref=e293]:
                  - generic [ref=e294]: moderate cancellation
                  - generic [ref=e295]: $455 / night
          - link "Bunkly Mountain Lodge Aspen resort Bunkly Mountain Lodge Aspen Aspen, United States 4.5 (67) Rustic luxury ski-in/ski-out resort at the base of Aspen Mountain. Featuring après-ski lounge with fireplace, outdoor heated pool, and farm-to-table dining. pool breakfast parking fitness spa strict cancellation $585 / night" [ref=e296] [cursor=pointer]:
            - /url: /properties/bunkly-mountain-lodge-aspen?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e299]:
              - generic [ref=e300]:
                - img "Bunkly Mountain Lodge Aspen" [ref=e301]
                - generic [ref=e302]: resort
              - generic [ref=e303]:
                - generic [ref=e304]:
                  - generic [ref=e305]:
                    - generic [ref=e306]:
                      - heading "Bunkly Mountain Lodge Aspen" [level=3] [ref=e307]
                      - paragraph [ref=e308]:
                        - img [ref=e309]
                        - text: Aspen, United States
                    - generic [ref=e312]:
                      - img [ref=e313]
                      - generic [ref=e315]: "4.5"
                      - generic [ref=e316]: (67)
                  - paragraph [ref=e317]: Rustic luxury ski-in/ski-out resort at the base of Aspen Mountain. Featuring après-ski lounge with fireplace, outdoor heated pool, and farm-to-table dining.
                  - generic [ref=e318]:
                    - generic [ref=e319]:
                      - img [ref=e320]
                      - generic [ref=e324]: pool
                    - generic [ref=e325]:
                      - img [ref=e326]
                      - generic [ref=e328]: breakfast
                    - generic [ref=e329]:
                      - img [ref=e330]
                      - generic [ref=e334]: parking
                    - generic [ref=e335]:
                      - img [ref=e336]
                      - generic [ref=e342]: fitness
                    - generic [ref=e343]:
                      - img [ref=e344]
                      - generic [ref=e347]: spa
                - generic [ref=e348]:
                  - generic [ref=e349]: strict cancellation
                  - generic [ref=e350]: $585 / night
          - link "The Grand Bunkly NYC hotel The Grand Bunkly NYC New York, United States 4.3 (44) A landmark five-star hotel in the heart of Midtown Manhattan, steps from Central Park and Fifth Avenue shopping. Elegant rooms blend classic sophistication with modern amenities. pool breakfast parking fitness spa moderate cancellation $389 / night" [ref=e351] [cursor=pointer]:
            - /url: /properties/the-grand-bunkly-nyc?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e354]:
              - generic [ref=e355]:
                - img "The Grand Bunkly NYC" [ref=e356]
                - generic [ref=e357]: hotel
              - generic [ref=e358]:
                - generic [ref=e359]:
                  - generic [ref=e360]:
                    - generic [ref=e361]:
                      - heading "The Grand Bunkly NYC" [level=3] [ref=e362]
                      - paragraph [ref=e363]:
                        - img [ref=e364]
                        - text: New York, United States
                    - generic [ref=e367]:
                      - img [ref=e368]
                      - generic [ref=e370]: "4.3"
                      - generic [ref=e371]: (44)
                  - paragraph [ref=e372]: A landmark five-star hotel in the heart of Midtown Manhattan, steps from Central Park and Fifth Avenue shopping. Elegant rooms blend classic sophistication with modern amenities.
                  - generic [ref=e373]:
                    - generic [ref=e374]:
                      - img [ref=e375]
                      - generic [ref=e379]: pool
                    - generic [ref=e380]:
                      - img [ref=e381]
                      - generic [ref=e383]: breakfast
                    - generic [ref=e384]:
                      - img [ref=e385]
                      - generic [ref=e389]: parking
                    - generic [ref=e390]:
                      - img [ref=e391]
                      - generic [ref=e397]: fitness
                    - generic [ref=e398]:
                      - img [ref=e399]
                      - generic [ref=e402]: spa
                - generic [ref=e403]:
                  - generic [ref=e404]: moderate cancellation
                  - generic [ref=e405]: $389 / night
          - link "Bunkly Beachfront Villa Maldives vacation rental Bunkly Beachfront Villa Maldives Male, Maldives 4.3 (173) Exclusive overwater villa in the Maldives. Glass floor panels reveal coral reefs below. Private butler, direct ocean access, and sunset dining on your personal deck. pool breakfast spa restaurant wifi non refundable cancellation $1,950 / night" [ref=e406] [cursor=pointer]:
            - /url: /properties/bunkly-beachfront-villa-maldives?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e409]:
              - generic [ref=e410]:
                - img "Bunkly Beachfront Villa Maldives" [ref=e411]
                - generic [ref=e412]: vacation rental
              - generic [ref=e413]:
                - generic [ref=e414]:
                  - generic [ref=e415]:
                    - generic [ref=e416]:
                      - heading "Bunkly Beachfront Villa Maldives" [level=3] [ref=e417]
                      - paragraph [ref=e418]:
                        - img [ref=e419]
                        - text: Male, Maldives
                    - generic [ref=e422]:
                      - img [ref=e423]
                      - generic [ref=e425]: "4.3"
                      - generic [ref=e426]: (173)
                  - paragraph [ref=e427]: Exclusive overwater villa in the Maldives. Glass floor panels reveal coral reefs below. Private butler, direct ocean access, and sunset dining on your personal deck.
                  - generic [ref=e428]:
                    - generic [ref=e429]:
                      - img [ref=e430]
                      - generic [ref=e434]: pool
                    - generic [ref=e435]:
                      - img [ref=e436]
                      - generic [ref=e438]: breakfast
                    - generic [ref=e439]:
                      - img [ref=e440]
                      - generic [ref=e443]: spa
                    - generic [ref=e445]: restaurant
                    - generic [ref=e446]:
                      - img [ref=e447]
                      - generic [ref=e451]: wifi
                - generic [ref=e452]:
                  - generic [ref=e453]: non refundable cancellation
                  - generic [ref=e454]: $1,950 / night
          - link "Bunkly Boutique Paris boutique Bunkly Boutique Paris Paris, France 4.0 (1) A chic boutique hotel in Le Marais, Paris. Blending 18th-century architecture with contemporary design, each room tells a unique story. Walking distance to the Louvre and Notre-Dame. breakfast wifi ac room service bar free cancellation $286 / night" [ref=e455] [cursor=pointer]:
            - /url: /properties/bunkly-boutique-paris?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e458]:
              - generic [ref=e459]:
                - img "Bunkly Boutique Paris" [ref=e460]
                - generic [ref=e461]: boutique
              - generic [ref=e462]:
                - generic [ref=e463]:
                  - generic [ref=e464]:
                    - generic [ref=e465]:
                      - heading "Bunkly Boutique Paris" [level=3] [ref=e466]
                      - paragraph [ref=e467]:
                        - img [ref=e468]
                        - text: Paris, France
                    - generic [ref=e471]:
                      - img [ref=e472]
                      - generic [ref=e474]: "4.0"
                      - generic [ref=e475]: (1)
                  - paragraph [ref=e476]: A chic boutique hotel in Le Marais, Paris. Blending 18th-century architecture with contemporary design, each room tells a unique story. Walking distance to the Louvre and Notre-Dame.
                  - generic [ref=e477]:
                    - generic [ref=e478]:
                      - img [ref=e479]
                      - generic [ref=e481]: breakfast
                    - generic [ref=e482]:
                      - img [ref=e483]
                      - generic [ref=e487]: wifi
                    - generic [ref=e489]: ac
                    - generic [ref=e491]: room service
                    - generic [ref=e493]: bar
                - generic [ref=e494]:
                  - generic [ref=e495]: free cancellation
                  - generic [ref=e496]: $286 / night
          - link "Bunkly Beach House Barcelona boutique Bunkly Beach House Barcelona Barcelona, Spain 3.9 (32) Mediterranean beachfront boutique hotel in Barceloneta. Rooftop terrace with infinity pool, tapas bar, and panoramic sea views. Steps from the beach and Gothic Quarter. pool breakfast parking fitness restaurant free cancellation $254 / night" [ref=e497] [cursor=pointer]:
            - /url: /properties/bunkly-beach-house-barcelona?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e500]:
              - generic [ref=e501]:
                - img "Bunkly Beach House Barcelona" [ref=e502]
                - generic [ref=e503]: boutique
              - generic [ref=e504]:
                - generic [ref=e505]:
                  - generic [ref=e506]:
                    - generic [ref=e507]:
                      - heading "Bunkly Beach House Barcelona" [level=3] [ref=e508]
                      - paragraph [ref=e509]:
                        - img [ref=e510]
                        - text: Barcelona, Spain
                    - generic [ref=e513]:
                      - img [ref=e514]
                      - generic [ref=e516]: "3.9"
                      - generic [ref=e517]: (32)
                  - paragraph [ref=e518]: Mediterranean beachfront boutique hotel in Barceloneta. Rooftop terrace with infinity pool, tapas bar, and panoramic sea views. Steps from the beach and Gothic Quarter.
                  - generic [ref=e519]:
                    - generic [ref=e520]:
                      - img [ref=e521]
                      - generic [ref=e525]: pool
                    - generic [ref=e526]:
                      - img [ref=e527]
                      - generic [ref=e529]: breakfast
                    - generic [ref=e530]:
                      - img [ref=e531]
                      - generic [ref=e535]: parking
                    - generic [ref=e536]:
                      - img [ref=e537]
                      - generic [ref=e543]: fitness
                    - generic [ref=e545]: restaurant
                - generic [ref=e546]:
                  - generic [ref=e547]: free cancellation
                  - generic [ref=e548]: $254 / night
          - link "Bunkly Harbour Hotel Sydney hotel Bunkly Harbour Hotel Sydney Sydney, Australia 3.9 (103) Iconic waterfront hotel at The Rocks with Opera House and Harbour Bridge views. Award-winning restaurants, infinity pool, and direct harbor access for sailing excursions. pool breakfast parking fitness spa moderate cancellation $546 / night" [ref=e549] [cursor=pointer]:
            - /url: /properties/bunkly-harbour-hotel-sydney?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e552]:
              - generic [ref=e553]:
                - img "Bunkly Harbour Hotel Sydney" [ref=e554]
                - generic [ref=e555]: hotel
              - generic [ref=e556]:
                - generic [ref=e557]:
                  - generic [ref=e558]:
                    - generic [ref=e559]:
                      - heading "Bunkly Harbour Hotel Sydney" [level=3] [ref=e560]
                      - paragraph [ref=e561]:
                        - img [ref=e562]
                        - text: Sydney, Australia
                    - generic [ref=e565]:
                      - img [ref=e566]
                      - generic [ref=e568]: "3.9"
                      - generic [ref=e569]: (103)
                  - paragraph [ref=e570]: Iconic waterfront hotel at The Rocks with Opera House and Harbour Bridge views. Award-winning restaurants, infinity pool, and direct harbor access for sailing excursions.
                  - generic [ref=e571]:
                    - generic [ref=e572]:
                      - img [ref=e573]
                      - generic [ref=e577]: pool
                    - generic [ref=e578]:
                      - img [ref=e579]
                      - generic [ref=e581]: breakfast
                    - generic [ref=e582]:
                      - img [ref=e583]
                      - generic [ref=e587]: parking
                    - generic [ref=e588]:
                      - img [ref=e589]
                      - generic [ref=e595]: fitness
                    - generic [ref=e596]:
                      - img [ref=e597]
                      - generic [ref=e600]: spa
                - generic [ref=e601]:
                  - generic [ref=e602]: moderate cancellation
                  - generic [ref=e603]: $546 / night
          - link "Bunkly B&B Cotswolds bnb Bunkly B&B Cotswolds London, United Kingdom 3.6 (93) Charming bed and breakfast in a Georgian townhouse near Hyde Park. Homemade English breakfast, cozy reading room, and individually decorated bedrooms with period features. breakfast wifi ac laundry free cancellation $176 / night" [ref=e604] [cursor=pointer]:
            - /url: /properties/bunkly-bb-cotswolds?checkIn=2026-08-23&checkOut=2026-08-26&guests=2
            - generic [ref=e607]:
              - generic [ref=e608]:
                - img "Bunkly B&B Cotswolds" [ref=e609]
                - generic [ref=e610]: bnb
              - generic [ref=e611]:
                - generic [ref=e612]:
                  - generic [ref=e613]:
                    - generic [ref=e614]:
                      - heading "Bunkly B&B Cotswolds" [level=3] [ref=e615]
                      - paragraph [ref=e616]:
                        - img [ref=e617]
                        - text: London, United Kingdom
                    - generic [ref=e620]:
                      - img [ref=e621]
                      - generic [ref=e623]: "3.6"
                      - generic [ref=e624]: (93)
                  - paragraph [ref=e625]: Charming bed and breakfast in a Georgian townhouse near Hyde Park. Homemade English breakfast, cozy reading room, and individually decorated bedrooms with period features.
                  - generic [ref=e626]:
                    - generic [ref=e627]:
                      - img [ref=e628]
                      - generic [ref=e630]: breakfast
                    - generic [ref=e631]:
                      - img [ref=e632]
                      - generic [ref=e636]: wifi
                    - generic [ref=e638]: ac
                    - generic [ref=e640]: laundry
                - generic [ref=e641]:
                  - generic [ref=e642]: free cancellation
                  - generic [ref=e643]: $176 / night
    - contentinfo [ref=e644]:
      - generic [ref=e645]:
        - generic [ref=e646]:
          - generic [ref=e647]: BUNKLY
          - generic [ref=e648]: Travels of distinction • Since MMXIV
          - img [ref=e650]
        - generic [ref=e656]:
          - generic [ref=e657]:
            - heading "The Houses" [level=3] [ref=e658]
            - generic [ref=e659]: ✦
            - list [ref=e660]:
              - listitem [ref=e661]:
                - link "The Collection" [ref=e662] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e663]:
                - link "New Openings" [ref=e664] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e665]:
                - link "About the House" [ref=e666] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e667]:
            - heading "Voyages" [level=3] [ref=e668]
            - generic [ref=e669]: ✦
            - list [ref=e670]:
              - listitem [ref=e671]:
                - link "List Your Property" [ref=e672] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e673]:
                - link "Host Resources" [ref=e674] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e675]:
                - link "Community Forum" [ref=e676] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e677]:
            - heading "Reception" [level=3] [ref=e678]
            - generic [ref=e679]: ✦
            - list [ref=e680]:
              - listitem [ref=e681]:
                - link "Concierge" [ref=e682] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e683]:
                - link "Safety & Comfort" [ref=e684] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e685]:
                - link "Cancellation Options" [ref=e686] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e687]:
            - heading "The House" [level=3] [ref=e688]
            - generic [ref=e689]: ✦
            - list [ref=e690]:
              - listitem [ref=e691]:
                - link "Privacy" [ref=e692] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e693]:
                - link "Terms of Service" [ref=e694] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e695]:
                - link "Accessibility" [ref=e696] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e697]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e698]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { BOOK_CHECKIN, BOOK_CHECKOUT } from './helpers';
  3  | 
  4  | const searchUrl = (city: string) =>
  5  |   `/search?location=${encodeURIComponent(city)}&checkIn=${BOOK_CHECKIN}&checkOut=${BOOK_CHECKOUT}&guests=2`;
  6  | 
  7  | // SEARCH-01 · Search returns results for a valid city  [P0]
  8  | test('SEARCH-01: Paris search returns property cards with name and price', async ({ page }) => {
  9  |   await page.goto(searchUrl('Paris'));
  10 |   await expect(page.getByTestId('search-results')).toBeVisible();
  11 |   const card = page.locator('[data-testid^="property-card-"]').first();
  12 |   await expect(card).toBeVisible();
  13 |   await expect(card).toContainText(/\w+/);
  14 | });
  15 | 
  16 | // SEARCH-02 · Empty search shows no-results state  [P0]
  17 | test('SEARCH-02: fictional city shows no-results message', async ({ page }) => {
  18 |   await page.goto(searchUrl('Atlantis'));
> 19 |   await expect(page.getByTestId('no-results')).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  20 |   await expect(page.getByTestId('search-results')).not.toBeVisible();
  21 | });
  22 | 
  23 | // SEARCH-03 · Filter and sort search results  [P0]
  24 | test('SEARCH-03: hotel type filter updates URL param', async ({ page }) => {
  25 |   await page.goto(searchUrl('Paris'));
  26 |   await expect(page.getByTestId('filter-panel')).toBeVisible();
  27 | 
  28 |   await page.getByTestId('filter-type-hotel').click();
  29 |   await expect(page).toHaveURL(/propertyTypes=hotel/);
  30 |   await expect(page.getByTestId('search-results')).toBeVisible();
  31 | });
  32 | 
  33 | test('SEARCH-03: sort by price-asc updates URL param', async ({ page }) => {
  34 |   await page.goto(searchUrl('Paris'));
  35 |   await page.getByTestId('sort-select').selectOption('price_asc');
  36 |   await expect(page).toHaveURL(/price_asc/);
  37 |   await expect(page.getByTestId('search-results')).toBeVisible();
  38 | });
  39 | 
  40 | // SEARCH-04 · Search history saved and cleared  [P2]
  41 | test('SEARCH-04: search history can be cleared', async ({ page }) => {
  42 |   await page.goto(searchUrl('Paris'));
  43 |   await page.goto(searchUrl('Tokyo'));
  44 |   await page.goto('/search');
  45 | 
  46 |   const clearBtn = page.locator('[data-testid="clear-search-history"]');
  47 |   if (await clearBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
  48 |     await clearBtn.click();
  49 |     await expect(clearBtn).not.toBeVisible();
  50 |   }
  51 |   // Passes whether history UI is present or not — feature may not be wired yet
  52 | });
  53 | 
```