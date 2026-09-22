/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const handleActionClick = (actionLabel: string) => {
    // Open default mail client or handle action
    window.location.href = `mailto:brucewrld3@gmail.com?subject=${encodeURIComponent(
      actionLabel
    )}`;
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:brucewrld3@gmail.com?subject=Inquiry%20via%20Jahail';
  };

  return (
    <main id="jahail-app" className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Navbar onContactClick={handleContactClick} />
      <Hero onActionClick={handleActionClick} />
    </main>
  );
}

