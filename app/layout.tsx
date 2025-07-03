import './globals.css'

export const metadata = {
  title: 'Quiz App - Test Senaryosu',
  description: 'Eğlenceli soru-cevap testi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
} 