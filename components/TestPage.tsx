'use client'

import { useState, useEffect, useRef } from 'react'
import { questions, Question } from '@/data/questions'

interface PlatformData {
  id: number;
  globalIndex: number;
  leftPercent: number;
  widthPx: number;
  isCurrentPlatform: boolean;
}

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [gameState, setGameState] = useState<'playing' | 'game-over' | 'success'>('playing')
  const [characterState, setCharacterState] = useState<'idle' | 'jumping' | 'falling'>('idle')
  const [currentRockIndex, setCurrentRockIndex] = useState(0) // Hangi kayada
  const [visiblePlatforms, setVisiblePlatforms] = useState(6) // Görünür platform sayısı
  const [showGameArea, setShowGameArea] = useState(true)
  const [platformData, setPlatformData] = useState<PlatformData[]>([]) // Platform verilerini state'te tutuyoruz

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / questions.length) * 100
  
  // Endless Runner Sistemi: Maskot ortada sabit, platformlar kayıyor
  const totalPlatforms = 20



  // Görünür platformları hesapla - sağdan sola kayıyor
  const getVisiblePlatforms = () => {
    const platforms = []
    
    // Responsive platform boyutları
    let platformSpacing = 20 // Desktop: Platformlar arası %20 mesafe
    let platformWidth = 150  // Desktop: 150px genişlik
    
    if (window.innerWidth <= 480) {
      // Çok küçük ekranlar - daha dar aralıklar
      platformSpacing = 25 // %25 mesafe (daha geniş)
      platformWidth = 100   // 100px genişlik
    } else if (window.innerWidth <= 768) {
      // Mobile ekranlar
      platformSpacing = 23  // %23 mesafe
      platformWidth = 120   // 120px genişlik
    }
    
    // 5 platform görünür: biri geride, biri maskotun altında, 3'ü ileride
    for (let i = -1; i <= 3; i++) {
      const platformIndex = currentRockIndex + i
      if (platformIndex >= 0 && platformIndex < totalPlatforms) {
        // Platform pozisyonu: Her zaman maskotun altında bir platform olacak şekilde hesaplama
        const basePosition = 50 + (i * platformSpacing) // Temel pozisyon
        
        platforms.push({
          id: platformIndex,
          globalIndex: platformIndex,
          leftPercent: basePosition, // Offset kaldırıldı - maskotun altında hep platform olsun
          widthPx: platformWidth,
          isCurrentPlatform: i === 0 // Maskotun üzerindeki platform
        })
      }
    }
    
    console.log(`🪨 Görünür platformlar (${window.innerWidth}px):`, platforms.map(p => `${p.id}:${p.leftPercent}% (${p.widthPx}px)`))
    return platforms
  }

  // Platform verilerini güncelleyen fonksiyon
  const updatePlatformData = () => {
    const newPlatforms = getVisiblePlatforms()
    setPlatformData(newPlatforms)
  }

  // Component mount olduğunda platformları hesapla
  useEffect(() => {
    updatePlatformData()
  }, [currentRockIndex]) // currentRockIndex değiştiğinde de güncelle

  // Endless Runner: Maskot her zaman merkezi pozisyonda sabit
  const calculateCharacterPosition = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 }
    
    const gameAreaWidth = gameAreaRef.current.offsetWidth
    
    // Responsive character boyutları
    let characterWidth = 120 // Desktop varsayılan
    let characterY = 125 // Desktop varsayılan
    
    if (window.innerWidth <= 480) {
      // Çok küçük ekranlar
      characterWidth = 80
      characterY = 120
    } else if (window.innerWidth <= 768) {
      // Mobile ekranlar  
      characterWidth = 90
      characterY = 125
    }
    
    // Maskot her zaman ekranın ortasında (50% pozisyonda) sabit durur
    const characterX = (gameAreaWidth * 0.5) - (characterWidth / 2)
    
    console.log(`🎯 Maskot sabit pozisyon:`, {
      gameAreaWidth: Math.round(gameAreaWidth),
      characterX: Math.round(characterX),
      characterY,
      characterWidth,
      screenWidth: window.innerWidth,
      centerPercent: '50%'
    })
    
    return { x: Math.round(characterX), y: characterY }
  }

  // Maskotun kayaya atlama animasyonu
  const jumpToRock = (targetRockIndex: number, onComplete?: () => void) => {
    console.log(`🦘 Atlama: Kaya ${currentRockIndex} → Kaya ${targetRockIndex}`)
    console.log(`📊 Platform durumu: Toplam ${totalPlatforms}, Hedef kaya ${targetRockIndex}`)
    
    // Önce platformları güncelle (eğer gerekirse)
    setCurrentRockIndex(targetRockIndex)
    
          // Basit platform geçişi - maskot her zaman güvenli
      console.log(`🎯 Platform geçişi: Kaya ${currentRockIndex} → ${targetRockIndex}`)
      
      setCharacterState('jumping')
      
      // Zıplama efekti (maskot yerinde zıplar)
      if (characterRef.current) {
        characterRef.current.style.animation = 'jumpInPlace 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
      
      // Animasyon tamamlandığında
      setTimeout(() => {
        setCharacterState('idle')
        if (characterRef.current) {
          characterRef.current.style.animation = ''
        }
        console.log(`✅ Kaya ${targetRockIndex} üzerine indi - Maskot güvenli!`)
        onComplete?.()
      }, 800)
  }

  // Başlangıç pozisyonunu ayarla ve resize olaylarını dinle
  useEffect(() => {
    const positionCharacter = () => {
      if (gameAreaRef.current && characterRef.current) {
        const startPosition = calculateCharacterPosition()
        characterRef.current.style.left = `${startPosition.x}px`
        characterRef.current.style.bottom = `${startPosition.y}px`
        characterRef.current.style.transition = 'none'
        console.log(`🎮 Maskot sabit pozisyonda`, startPosition)
        return true
      }
      return false
    }

    // Resize event handler - mobile döndürme için
    const handleResize = () => {
      console.log(`📱 Resize algılandı: ${window.innerWidth}x${window.innerHeight}`)
      setTimeout(() => {
        positionCharacter()
        updatePlatformData() // Platformları da yeniden hesapla
      }, 100) // DOM güncellenmesini bekle
    }

    // İlk pozisyonlama
    const timer = setTimeout(() => {
      if (!positionCharacter()) {
        // Başarısız olursa bir kez daha dene
        setTimeout(positionCharacter, 200)
      }
    }, 50)

    // Resize event listener ekle
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  const handleAnswer = (selectedIndex: number) => {
    console.log(`🖱️ Tıklama algılandı! Seçilen: ${selectedIndex}, Doğru cevap: ${currentQuestion.correctAnswer}`)
    console.log(`📍 Mevcut durum: Kaya ${currentRockIndex}, Soru ${currentQuestionIndex + 1}`)
    
    const isCorrect = selectedIndex === currentQuestion.correctAnswer

    if (isCorrect) {
      // Doğru cevap - bir sonraki kayaya atla
      console.log(`✅ Doğru cevap!`)
      
      if (currentQuestionIndex + 1 >= questions.length) {
        // Tüm sorular bitti - başarı ekranı
        setGameState('success')
        console.log(`🎉 Oyun tamamlandı! Final kaya: ${currentRockIndex}`)
      } else {
        // Sonraki kayaya atla
        const nextRockIndex = Math.min(totalPlatforms - 1, currentRockIndex + 1)
        console.log(`🎯 Hedef kaya: ${nextRockIndex}`)
        jumpToRock(nextRockIndex, () => {
          // Atlama tamamlandıktan sonra sonraki soruya geç
          const nextQuestionIndex = currentQuestionIndex + 1
          setCurrentQuestionIndex(nextQuestionIndex)
          console.log(`➡️ Sonraki soru: ${nextQuestionIndex + 1}`)
        })
      }
    } else {
      // Yanlış cevap - lavaya düş
      console.log(`❌ Yanlış cevap! Maskot lava'ya düşüyor...`)
      setCharacterState('falling')
      
      setTimeout(() => {
        setGameState('game-over')
      }, 1500)
    }
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setGameState('playing')
    setCharacterState('idle')
    setCurrentRockIndex(0)

    setVisiblePlatforms(6)
    setShowGameArea(true)
    
    console.log(`🔄 Oyun sıfırlandı - Başlangıç pozisyonu`)
    
    // Başlangıç pozisyonuna geri dön - responsive hesaplama ile
    setTimeout(() => {
      if (characterRef.current) {
        const startPosition = calculateCharacterPosition()
        characterRef.current.style.left = `${startPosition.x}px`
        characterRef.current.style.bottom = `${startPosition.y}px`
        characterRef.current.style.transition = 'none'
        characterRef.current.style.animation = ''
        updatePlatformData() // Platformları da yeniden hesapla
        console.log(`🎮 Reset: Maskot sabit pozisyonda (responsive)`, startPosition)
      }
    }, 100)
  }

  const restartGame = () => {
    resetGame()
  }

  // Türkçe gramer kurallarına uygun cevap formatı
  const formatCorrectAnswer = (answer: string) => {
    // Özel isim kontrolü - ilk harf büyük ve bilinen özel isim kategorilerinde
    const properNouns = [
      // Şehirler
      'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri',
      'Eskişehir', 'Diyarbakır', 'Samsun', 'Denizli', 'Şanlıurfa', 'Trabzon', 'Malatya', 'Elazığ', 'Erzurum',
      // Ülkeler
      'Türkiye', 'Almanya', 'Fransa', 'İngiltere', 'Amerika', 'İtalya', 'Japonya', 'Çin', 'Rusya', 'Yunanistan',
      // Kişi adları (yaygın örnekler)
      'Ali', 'Mehmet', 'Ahmet', 'Mustafa', 'Ayşe', 'Fatma', 'Hatice', 'Emine', 'Zeynep', 'Melisa', 'Nur',
      // Diğer özel isimler
      'Uluslararası İlişkiler', 'Ankara University', 'Ankara Üniversitesi'
    ]
    
    // Cevabın özel isim olup olmadığını kontrol et
    const isProperNoun = properNouns.includes(answer) || 
                         (answer[0] === answer[0].toUpperCase() && 
                          answer.length > 1 && 
                          answer[1] === answer[1].toLowerCase())
    
    // Son harfin sesli uyumuna göre ek belirle
    const lastChar = answer.toLowerCase().slice(-1)
    let suffix = ''
    
    if (['a', 'ı'].includes(lastChar)) {
      suffix = 'dı'
    } else if (['e', 'i'].includes(lastChar)) {
      suffix = 'di'
    } else if (['o', 'u'].includes(lastChar)) {
      suffix = 'du'
    } else if (['ö', 'ü'].includes(lastChar)) {
      suffix = 'dü'
    } else {
      // Ünsüz ile bitiyorsa, kelimenin genel sesli uyumuna bak
      const vowels = answer.toLowerCase().match(/[aıeioöuü]/g)
      if (vowels) {
        const lastVowel = vowels[vowels.length - 1]
        if (['a', 'ı'].includes(lastVowel)) {
          suffix = 'dı'
        } else if (['e', 'i'].includes(lastVowel)) {
          suffix = 'di'
        } else if (['o', 'u'].includes(lastVowel)) {
          suffix = 'du'
        } else if (['ö', 'ü'].includes(lastVowel)) {
          suffix = 'dü'
        }
      } else {
        suffix = 'di' // varsayılan
      }
    }
    
    // Özel isim ise kesme işareti kullan, değilse doğrudan birleştir
    if (isProperNoun) {
      return `Cevap ${answer}'${suffix}`
    } else {
      return `Cevap ${answer}${suffix}`
    }
  }

  useEffect(() => {
    // Her soru değiştiğinde karakteri reset et
    if (gameState === 'playing') {
      setCharacterState('idle')
    }
  }, [currentQuestionIndex, gameState])

  // Pencere boyutu değiştiğinde karakteri yeniden konumlandır
  useEffect(() => {
    const handleResize = () => {
      if (gameState === 'playing' && characterRef.current && gameAreaRef.current) {
        const currentPosition = calculateCharacterPosition()
        characterRef.current.style.left = `${currentPosition.x}px`
        characterRef.current.style.bottom = `${currentPosition.y}px`
        console.log(`🔄 Pencere boyutu değişti - Karakter yeniden konumlandırıldı:`, currentPosition)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [gameState, currentRockIndex])

  if (gameState === 'game-over') {
    const correctAnswer = currentQuestion.options[currentQuestion.correctAnswer]
    return (
      <div className="game-over">
        <h1 className="quiz-title">Melisa'yı Ne Kadar İyi Tanıyorsun?</h1>
        <h1>{formatCorrectAnswer(correctAnswer)} 😔</h1>
        <p>Maalesef yanlış cevap verdin ve Melisa'yı lavlara düşürdün!</p>
        <button onClick={restartGame}>
          Tekrar Dene
        </button>
      </div>
    )
  }

  if (gameState === 'success') {
    return (
      <div className="success-screen">
        <h1 className="quiz-title" style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Beni Gerçekten İyi Tanıyorsun</h1>
        <h1>🎉 Tebrikler! 🎉</h1>
        <p>Tüm soruları doğru cevapladın!</p>
        <p>Melisa'yı güvenle hedefe ulaştırdın!</p>
        <button onClick={restartGame}>
          Yeniden Oyna
        </button>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      {/* Uçan Kuşlar Katmanı */}
      <div className="sky-birds"></div>
      
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      
      {/* Soru Bölümü */}
      <div className="question-section">
        <h1 className="quiz-title">Melisa'yı Ne Kadar İyi Tanıyorsun?</h1>
        
        <div className="question-card">
          <div className="question-number">
            Soru {currentQuestionIndex + 1} / {questions.length}
          </div>
          
          <h2 className="question-title">
            {currentQuestion.question}
          </h2>
          
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(index)}
                disabled={characterState !== 'idle'}
              >
                <span>{String.fromCharCode(65 + index)}) {option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Oyun Alanı - Kaya Platformları */}
      {showGameArea && (
        <div className="game-area" ref={gameAreaRef}>
          {/* Kaya Platformları */}
          {platformData.map((rock) => (
            <div
              key={rock.id}
              className="rock-platform sliding-platform"
              style={{
                left: `${rock.leftPercent}%`,
                width: `${rock.widthPx}px`
              }}
            ></div>
          ))}
          
          {/* Homojen Lav Zemini */}
          <div className="lava-floor"></div>
          
          {/* Karakter - Kaya Atlayıcı */}
          <div 
            ref={characterRef}
            className={`character ${characterState}`}
          ></div>
        </div>
      )}
    </div>
  )
} 