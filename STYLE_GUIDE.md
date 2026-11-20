# Dallas Software Developers website styles

The shared site frame sets the colors, fonts, page width, header, and footer for every route. Use the existing DSD logo, community photos, and speaker portraits.

| Element                                                            | Where it lives                                                                                                   |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Page frame, navigation, and footer                                 | [SiteFrame](src/app/SiteFrame.tsx) and [page.module.css](src/app/page.module.css)                                |
| Font loading, base type, keyboard focus, and reduced motion        | [Root layout](src/app/layout.tsx) and [globals.css](src/app/globals.css)                                         |
| Interior page headers, section titles, photos, and calls to action | [Editorial components](src/app/_site/Editorial.tsx) and [interior.module.css](src/app/_site/interior.module.css) |
| Homepage program sections and featured speakers                    | [Homepage components and CSS modules](src/app/_home/)                                                            |

The frame defines `--night` (#0b1318), `--paper` (#f8f8f4), and `--gold` (#ffca23). Use `--home-pad` to align full-width sections with the page edges. DM Sans is the main typeface. Caveat appears in short handwritten accents. Both fonts are self-hosted.

Keep section-specific styles in CSS modules. When changing shared styles, check the homepage and an interior page at wide and narrow widths. Open the mobile menu and tab through its links to verify keyboard access.
