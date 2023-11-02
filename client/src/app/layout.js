import './globals.css';
import { Inter } from 'next/font/google';

// Components
import SessionProvider from "@/context/SessionProvider";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Revista de eventos!',
  description: ':D',
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
            {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
