import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Admin - Qencorroe',
  description: 'Panel d\'administration externe pour la boutique Qencorroe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}