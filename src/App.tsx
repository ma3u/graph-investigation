import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  ArrowRight, 
  Shield, 
  Database, 
  Network, 
  Clock, 
  Lock,
  ChartBar,
  Handshake,
  AlertTriangle,
  Users,
  FileText,
  BrainCircuit,
  CheckCircle2,
  TrendingUp,
  Zap,
  Eye,
  Play,
  ArrowDown,
  Scale,
  Globe,
  BookOpen,
  ShieldCheck,
  Fingerprint,
  Landmark,
  ScrollText,
  Workflow
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { PoliceKnowledgeGraph3D } from "@/components/PoliceKnowledgeGraph3D"

function App() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)
  const [activeScenario, setActiveScenario] = useState<number>(0)
  const [showIntroGuide, setShowIntroGuide] = useState<boolean>(true)
  const [isPlayingNarration, setIsPlayingNarration] = useState(false)
  const architectureRef = useRef<HTMLDivElement>(null)
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null)

  const toggleNarration = useCallback(() => {
    if (isPlayingNarration) {
      if (narrationAudioRef.current) {
        narrationAudioRef.current.pause()
        narrationAudioRef.current.currentTime = 0
      }
      setIsPlayingNarration(false)
      return
    }
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/hydra_briefing.mp3`)
    audio.onended = () => setIsPlayingNarration(false)
    audio.onerror = () => setIsPlayingNarration(false)
    narrationAudioRef.current = audio
    audio.play()
    setIsPlayingNarration(true)
  }, [isPlayingNarration])
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3])

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroGuide(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const challenges = [
    {
      icon: Network,
      title: "Organisierte Kriminalität & Cybercrime",
      stat: "2,7 Mrd. €",
      statLabel: "Schaden 2023",
      description: "Schadensumme durch Organisierte Kriminalität erreichte 2023 einen Höchstwert – mit steigender Tendenz bei Cyberkriminalität.",
      trend: "+120%",
      color: "oklch(0.55 0.22 25)"
    },
    {
      icon: Database,
      title: "Datensilos & föderale Fragmentierung",
      stat: "20",
      statLabel: "Polizeien",
      description: "Heterogene IT-Landschaft erschwert bundesländerübergreifenden Datenaustausch und effiziente Ermittlungsarbeit.",
      trend: "320k",
      color: "oklch(0.45 0.12 240)"
    },
    {
      icon: FileText,
      title: "Rechtliche Rahmenbedingungen",
      stat: "BVerfG",
      statLabel: "Urteil 2023",
      description: "Höhere Hürden für automatisierte Datenanalyse bei gleichzeitigem Beschleunigungsgrundsatz in Strafverfahren.",
      trend: "Neu",
      color: "oklch(0.25 0.05 250)"
    },
    {
      icon: Users,
      title: "Personalmangel & Überlastung",
      stat: "320k",
      statLabel: "Beschäftigte",
      description: "Polizeibeschäftigte bewältigen exponentiell wachsende Datenmengen – KI als Multiplikator menschlicher Expertise.",
      trend: "Kritisch",
      color: "oklch(0.55 0.18 200)"
    }
  ]

  const layers = [
    {
      number: 1,
      title: "Normative Schicht",
      subtitle: "Das strukturelle Skelett",
      description: "Hierarchie der Rechtsquellen vom EU-Recht bis zu Dienstvorschriften. Das System versteht Normenhierarchien und traversiert sie konsistent.",
      icon: Shield,
      color: "oklch(0.25 0.05 250)",
      examples: ["EU-Recht", "Grundgesetz", "StPO", "Landespolizeigesetze"]
    },
    {
      number: 2,
      title: "Zeitliche Dimension",
      subtitle: "Validität & Versionierung",
      description: "Zeitliche Gültigkeit jeder Rechtsgrundlage. Automatische Prüfung welche Gesetzesfassung zum Tatzeitpunkt galt und korrekte Fristberechnung.",
      icon: Clock,
      color: "oklch(0.45 0.12 240)",
      examples: ["Verjährungsfristen", "Gesetzesänderungen", "Haftprüfungen", "TKÜ-Verlängerungen"]
    },
    {
      number: 3,
      title: "Prozedurale Zustandsmaschine",
      subtitle: "Die Prozessdimension",
      description: "Ermittlungsverfahren als formale Prozesse mit definierten Zuständen, Übergängen und Fristen. Proaktive Vorschläge für nächste Schritte.",
      icon: ChartBar,
      color: "oklch(0.55 0.18 200)",
      examples: ["Verfahrenszustände", "Prozessübergänge", "Fristüberwachung", "SOPs"]
    },
    {
      number: 4,
      title: "Fallbezogener Overlay",
      subtitle: "Die Faktendimension",
      description: "Konkrete Fakten eines Ermittlungsvorgangs: Personen, Beweismittel, Zeugenaussagen, Kommunikationsdaten im Kontext der Normenhierarchie.",
      icon: Database,
      color: "oklch(0.55 0.22 25)",
      examples: ["Personen", "Beweismittel", "Kommunikation", "Ortsdaten"]
    }
  ]

  const scenarios = [
    {
      title: "Organisierte Kriminalität",
      description: "Analyse komplexer OK-Strukturen mit Geldwäsche, Drogenhandel und Menschenschmuggel über Ländergrenzen hinweg.",
      benefits: [
        "Automatische Verknüpfung von Personen, Firmen und Konten im Knowledge Graph",
        "Prüfung der Rechtsgrundlagen unter Berücksichtigung aktueller BVerfG-Anforderungen",
        "Proaktive Warnungen vor ablaufenden Fristen",
        "Graph-Algorithmen identifizieren versteckte Netzwerkverbindungen"
      ],
      icon: Network,
      color: "oklch(0.55 0.22 25)",
      impact: "2 Billionen USD weltweit gewaschen jährlich"
    },
    {
      title: "Cybercrime-Ermittlungen",
      description: "Aufklärung von Ransomware-Angriffen mit IT-Forensik, Server-Logs, Blockchain-Analyse und Darknet-Kommunikation.",
      benefits: [
        "Automatische Extraktion von Indikatoren aus Massendaten",
        "Abgleich mit bekannten Modus-Operandi-Mustern",
        "Sprachübergreifende Analyse unter Beibehaltung semantischer Kontexte",
        "Nachvollziehbare Dokumentation für Beweisführung vor Gericht"
      ],
      icon: Lock,
      color: "oklch(0.45 0.12 240)",
      impact: "178,6 Mrd. € Schaden durch Cyberangriffe in 2024"
    },
    {
      title: "Grenzüberschreitende Fahndung",
      description: "Internationale Zusammenarbeit mit Europol und nationalen Partnerbehörden bei verschlüsselter Kommunikation.",
      benefits: [
        "Fuzzy-Logik erkennt verschiedene Schreibweisen und ordnet eindeutig zu",
        "Zusammenführung von Daten aus unterschiedlichen Systemen und Rechtsräumen",
        "Sicherstellung der Datenverarbeitung nach nationalen und EU-Rechtsgrundlagen",
        "Granulare Zugriffssteuerung und vollständige Auditierbarkeit"
      ],
      icon: Handshake,
      color: "oklch(0.55 0.18 200)",
      impact: "Über 131.000 Cybercrime-Fälle in Deutschland"
    },
    {
      title: "Digital Twin & Standards",
      description: "Digitaler Zwilling eines Ermittlungsfalls: alle Datenquellen – GPS, Mobilfunk, Finanztransaktionen, Social Media, Computer-Forensik – werden in einem einheitlichen, standardbasierten Wissensmodell aggregiert.",
      benefits: [
        "Aggregation aller Quellen (Bank, PayPal, Krypto, OSINT, Mobilfunkdaten, GPS) zu einem ganzheitlichen Fallbild",
        "Interoperabilität durch ISO 23247, STIX 2.1, ISO 27037/27042 und XPolizei-Standards",
        "Lückenlose digitale Beweiskette (Chain of Custody) nach BSI IT-Forensik & NIST SP 800-86",
        "Automatische Erkennung und Korrelation von Transaktionsmustern über Konto-, Krypto- und E-Geld-Netzwerke"
      ],
      icon: BrainCircuit,
      color: "oklch(0.55 0.22 170)",
      impact: "Ganzheitlicher Digital Twin pro Ermittlungsfall"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatePresence>
        {showIntroGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Card className="shadow-2xl border-2 border-accent">
              <CardContent className="p-6 flex items-center gap-4">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="h-6 w-6 text-accent" />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground">Scrollen Sie, um mehr zu erfahren</p>
                  <p className="text-sm text-muted-foreground">Interaktive Elemente erwarten Sie</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <BrandMark />
            <Separator orientation="vertical" className="h-8 hidden md:block" />
            <span className="text-sm font-medium text-muted-foreground hidden md:block">Knowledge Graph & GraphRAG für Ermittlungen</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('architecture')}
              className="hidden md:flex"
            >
              Technologie
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('scenarios')}
              className="hidden md:flex"
            >
              Praxisszenarien
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('standards')}
              className="hidden md:flex"
            >
              Standards
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('cooperation')}
              className="hidden md:flex"
            >
              Kooperation
            </Button>
          </div>
        </div>
      </header>

      <motion.section 
        style={{ opacity: heroOpacity }}
        className="hero-pattern py-32 md:py-40 relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-accent text-accent-foreground text-base px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Neuro-Symbolische KI-Architektur
              </Badge>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground leading-tight">
              Digitaler Wissens&shy;assistent für die Polizei
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Wie Multi-Layered Ontologien die Defizite von KI-Sprachmodellen überwinden und moderne Ermittlungsarbeit revolutionieren.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 h-14 shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => scrollToSection('architecture')}
              >
                <Play className="mr-2 h-5 w-5" />
                Demo entdecken
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 h-14 border-2"
                onClick={() => scrollToSection('challenges')}
              >
                Herausforderungen verstehen
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section id="challenges" className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Eye className="h-4 w-4 mr-2" />
              Schritt 1: Das Problem verstehen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Die Herausforderungen der modernen Polizeiarbeit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              320.000 Polizeibeschäftigte in Deutschland stehen vor einem fundamentalen Dilemma: 
              exponentiell wachsende Datenmengen bei fragmentierter IT-Infrastruktur.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${challenge.color}15` }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon 
                            className="h-8 w-8" 
                            style={{ color: challenge.color }}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                            {challenge.title}
                          </CardTitle>
                          <div className="flex items-center gap-3 mb-3">
                            <div>
                              <div className="text-3xl font-bold" style={{ color: challenge.color }}>
                                {challenge.stat}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                {challenge.statLabel}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-sm font-semibold">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {challenge.trend}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {challenge.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-destructive/5"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20 text-base px-4 py-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Schritt 2: Warum reine LLMs nicht genügen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ChatGPT & Co. für die Polizei ungeeignet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Large Language Models sind probabilistisch – Polizeiarbeit ist deterministisch. 
              Halluzinationen, temporale Blindheit und fehlende Zustandsverwaltung machen reine LLMs unbrauchbar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Statistische Plausibilität ≠ Logische Validität",
                description: "Ein halluzinierter Paragraf oder falsche Fristberechnung kann fatale Folgen haben – von Verfahrensverzögerung bis zur Unverwertbarkeit von Beweisen.",
                icon: AlertTriangle
              },
              {
                title: "Temporale Blindheit",
                description: "Kein Verständnis für Verjährungsfristen, Gesetzesänderungen oder zeitliche Abhängigkeiten. Kritisch bei Haftprüfungen und TKÜ-Verlängerungen.",
                icon: Clock
              },
              {
                title: "Fehlende Zustandsverwaltung",
                description: "Ermittlungsverfahren sind langfristige State Machines – LLMs haben kein Gedächtnis über Sitzungen hinweg.",
                icon: Database
              }
            ].map((problem, index) => {
              const Icon = problem.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-destructive/5 border-2 border-destructive/20 hover:border-destructive/40 transition-colors">
                    <CardHeader>
                      <div className="mb-4">
                        <Icon className="h-10 w-10 text-destructive" />
                      </div>
                      <CardTitle className="text-xl leading-tight">{problem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="architecture" ref={architectureRef} className="py-32 bg-primary/5 network-pattern relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground text-base px-4 py-2">
              <BrainCircuit className="h-4 w-4 mr-2" />
              Schritt 3: Die Lösung
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multi-Layered Ontologie-Architektur
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Structure-Aware Temporal Graph RAG (SAT-Graph RAG) in Neo4j-Graphdatenbank 
              kombiniert symbolische KI mit LLM-Sprachverarbeitung.
            </p>
            <p className="text-base text-primary font-semibold">
              👆 Klicken Sie auf die Schichten, um mehr zu erfahren
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="space-y-4">
              {layers.map((layer, index) => {
                const Icon = layer.icon
                const isSelected = selectedLayer === index
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'ring-4 ring-primary shadow-2xl scale-105' 
                          : 'hover:shadow-lg hover:scale-102'
                      }`}
                      onClick={() => setSelectedLayer(isSelected ? null : index)}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${layer.color}15` }}
                            animate={{ 
                              scale: isSelected ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon 
                              className="h-8 w-8" 
                              style={{ color: layer.color }}
                            />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge 
                                variant="outline"
                                className="text-sm"
                                style={{ borderColor: layer.color, color: layer.color }}
                              >
                                Schicht {layer.number}
                              </Badge>
                              <CardTitle className="text-xl">{layer.title}</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              {layer.subtitle}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <Separator className="mb-4" />
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {layer.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {layer.examples.map((example, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {example}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="sticky top-24 h-[700px]"
            >
              <div className="absolute top-3 left-3 z-10">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isPlayingNarration ? "default" : "outline"}
                        size="sm"
                        onClick={toggleNarration}
                        className="gap-2 shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background/90"
                      >
                        {isPlayingNarration ? (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Briefing läuft …
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Briefing
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="start"
                      className="max-w-xs text-sm leading-relaxed"
                    >
                      <p className="font-semibold mb-1">Briefing anhören</p>
                      <p>
                        Ausführliches Briefing zum Hydra-Fall: Eine Graphen-Architektur der den Hydra-Market Fall mit 88 Knoten und 113 
                        Beziehungen zeigt und erklärt, wie Geldwäsche-Netzwerke, Ransomware-Gruppen,
                        Nachfolgemärkte, Standards und Best Practices. (ca. 8 Min.)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ErrorBoundary FallbackComponent={GraphErrorFallback}>
                <PoliceKnowledgeGraph3D />
              </ErrorBoundary>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="scenarios" className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Schritt 4: Praxis erleben
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Praxisszenarien für die Polizei
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Konkrete Anwendungsfälle zeigen, wie ein Knowledge Graph die tägliche Ermittlungsarbeit unterstützt.
            </p>
          </motion.div>

          <Tabs value={String(activeScenario)} onValueChange={(v) => setActiveScenario(Number(v))} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-2 mb-12 max-w-5xl mx-auto">
              {scenarios.map((scenario, index) => {
                const Icon = scenario.icon
                return (
                  <TabsTrigger 
                    key={index} 
                    value={String(index)}
                    className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">
                      {scenario.title}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon
              return (
                <TabsContent key={index} value={String(index)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-2 hover:shadow-2xl transition-shadow">
                      <CardHeader className="pb-8">
                        <div className="flex items-start gap-6">
                          <motion.div 
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: `${scenario.color}15` }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Icon 
                              className="h-12 w-12" 
                              style={{ color: scenario.color }}
                            />
                          </motion.div>
                          <div className="flex-1">
                            <CardTitle className="text-3xl mb-4">{scenario.title}</CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {scenario.description}
                            </CardDescription>
                            <Badge variant="secondary" className="mt-4">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {scenario.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-6" />
                        <h4 className="font-semibold text-lg mb-4">Graph-Funktionen für diesen Fall:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {scenario.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: i * 0.1 }}
                              className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground leading-relaxed">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </section>

      {/* ── SECTION: Standards & Normen ── */}
      <section id="standards" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Scale className="h-4 w-4 mr-2" />
              Schritt 5: Standards & Compliance
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welche Standards müssen beachtet werden?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Polizeiliche Ermittlungen im digitalen Raum unterliegen einem komplexen Geflecht aus internationalen,
              europäischen und nationalen Normen. Der Knowledge Graph integriert diese Standards direkt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Globe,
                title: "Internationale Standards",
                color: "oklch(0.55 0.18 200)",
                standards: [
                  { name: "STIX 2.1 (OASIS)", desc: "Structured Threat Intelligence eXpression — standardisiertes Format für den Austausch von Cyber-Bedrohungsinformationen zwischen Behörden und Organisationen weltweit" },
                  { name: "ISO 27037", desc: "Richtlinien zur Identifizierung, Sammlung, Sicherung und Aufbewahrung digitaler Beweismittel — internationale Grundlage der IT-Forensik" },
                  { name: "ISO 27042", desc: "Analyse und Interpretation digitaler Beweismittel — Sicherstellung der Gerichtsverwertbarkeit" },
                  { name: "NIST SP 800-86", desc: "Guide to Integrating Forensic Techniques — Best-Practice-Framework des US-Handelsministeriums für digitale Forensik" },
                  { name: "ISO 23247", desc: "Digital Twin Framework — standardisierte Architektur für digitale Zwillinge, angewandt auf Ermittlungsfälle" }
                ]
              },
              {
                icon: Landmark,
                title: "EU-Recht & Regulierung",
                color: "oklch(0.45 0.12 240)",
                standards: [
                  { name: "DSGVO (EU 2016/679)", desc: "Datenschutz-Grundverordnung — Rechtsrahmen für die Verarbeitung personenbezogener Daten, einschl. Recht auf Löschung und Auskunft" },
                  { name: "NIS2-Richtlinie (EU 2022/2555)", desc: "Cybersicherheits-Richtlinie für kritische Infrastrukturen — Meldepflichten, Risikomanagement, Aufsichtsbefugnisse" },
                  { name: "EU-Geldwäscherichtlinien (AMLD 5/6)", desc: "Bekämpfung von Geldwäsche und Terrorismusfinanzierung — Know-Your-Customer-Pflichten für Kryptobörsen" },
                  { name: "Europäische Ermittlungsanordnung (EEA)", desc: "Rechtsinstrument für den gegenseitigen Beweis-Austausch zwischen EU-Mitgliedstaaten innerhalb von 120 Tagen" },
                  { name: "Prümer Vertrag (EU 2024)", desc: "Automatisierter Abgleich von DNA, Fingerabdrücken, Kfz-Daten und Gesichtsbildern zwischen EU-Polizeibehörden" }
                ]
              },
              {
                icon: Shield,
                title: "Nationale Normen (DE/US)",
                color: "oklch(0.25 0.05 250)",
                standards: [
                  { name: "XPolizei 2.0", desc: "Deutscher Interoperabilitätsstandard der Polizei — einheitliches Datenaustauschformat zwischen Bundes- und Landespolizeien" },
                  { name: "StPO (Strafprozessordnung)", desc: "Verfahrensrechtliche Grundlage für Ermittlungen — §100a TKÜ, §100b Online-Durchsuchung, §94 Beschlagnahmung" },
                  { name: "BSI IT-Forensik-Leitfaden", desc: "Bundesamt für Sicherheit — Leitfaden zur forensischen Sicherung und Analyse digitaler Beweismittel" },
                  { name: "EO 13694 (US)", desc: "Executive Order zur Blockierung von Eigentum bei bösartigen Cyber-Aktivitäten — Rechtsgrundlage der OFAC-Sanktionen gegen Hydra, Garantex" },
                  { name: "BVerfG-Urteil 2023", desc: "Verfassungsrechtliche Anforderungen an automatisierte Datenanalyse — Verhältnismäßigkeit, Transparenz, Überprüfbarkeit" }
                ]
              }
            ].map((category, catIndex) => {
              const CatIcon = category.icon
              return (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${category.color}15` }}>
                          <CatIcon className="h-7 w-7" style={{ color: category.color }} />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.standards.map((std, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="font-semibold text-sm text-foreground mb-1">{std.name}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{std.desc}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Standards-Integration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Alle genannten Standards sind direkt im Knowledge Graph verankert. Jede Entität trägt STIX-2.1-Typinformationen,
                      jede Ermittlungsmaßnahme wird automatisch gegen die normative Schicht (StPO, DSGVO, NIS2) validiert,
                      und die zeitliche Dimension prüft die Anwendbarkeit der jeweiligen Gesetzesfassung zum Tatzeitpunkt.
                      XPolizei-2.0-Typisierungen ermöglichen den nahtlosen Datenaustausch zwischen Bundes- und Landespolizeien.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION: Ermittlungs-Best-Practices ── */}
      <section id="bestpractices" className="py-32 bg-card relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Schritt 6: Best Practices
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ermittlungs-Best-Practices
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bewährte Methoden der digitalen Ermittlungsarbeit — systematisch, rechtskonform und gerichtsverwertbar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Fingerprint,
                title: "Digitale Beweissicherung (Chain of Custody)",
                color: "oklch(0.55 0.22 25)",
                practices: [
                  "Kryptographische Hashwerte (SHA-256) bei jeder Sicherung — lückenloser Nachweis der Unverändertheit",
                  "Write-Blocker bei forensischen Kopien — Originalbeweise niemals direkt verändern",
                  "Vier-Augen-Prinzip bei Beschlagnahmung und Auswertung digitaler Asservate",
                  "Vollständige Protokollierung aller Zugriffe mit Zeitstempo, Person und Zweck (Audit Trail)",
                  "ISO 27037-konforme Dokumentation — vom Auffinden bis zur Vorlage vor Gericht"
                ]
              },
              {
                icon: Network,
                title: "Blockchain-Forensik & Kryptoanalyse",
                color: "oklch(0.45 0.12 240)",
                practices: [
                  "Cluster-Analyse zur Identifikation zusammengehöriger Wallet-Adressen (Heuristiken: Common-Input, Change-Address)",
                  "Cross-Chain-Tracking bei Mixer-/Bridge-Transaktionen — z.B. Hydras Bitcoin Bank Mixer",
                  "Korrelation von On-Chain-Daten mit Off-Chain-Informationen (KYC-Daten, IP-Adressen, Forum-Accounts)",
                  "OFAC SDN-Listen-Abgleich — automatische Flagging sanktionierter Adressen (>100 Hydra-Adressen)",
                  "Zeitliche Muster-Erkennung: Transaktionszeitpunkte korreliert mit realen Ereignissen"
                ]
              },
              {
                icon: ScrollText,
                title: "Strukturierte Ermittlungsführung",
                color: "oklch(0.25 0.05 250)",
                practices: [
                  "Ermittlungshypothesen formal im Knowledge Graph modellieren und systematisch verifizieren/falsifizieren",
                  "Proaktives Fristenmanagement — automatische Warnung vor Verjährung, Haftprüfung, TKÜ-Verlängerung",
                  "Ermittlungsverfahren als Zustandsmaschine: definierte Übergänge von Vorermittlung → Hauptermittlung → Anklage",
                  "Aktenzeichen-basierte Verknüpfung aller Beweismittel, Beschlüsse und Protokolle",
                  "Regelmäßige Ermittlungsreviews mit Graph-gestützter Lagedarstellung"
                ]
              },
              {
                icon: Workflow,
                title: "KI-gestützte Analyse & Qualitätssicherung",
                color: "oklch(0.55 0.18 200)",
                practices: [
                  "Neuro-symbolischer Ansatz: LLM-Sprachverarbeitung + deterministische Graph-Validierung = keine Halluzinationen",
                  "Automatische Anonymisierung personenbezogener Daten nach DSGVO-Vorgaben bei Datenexport",
                  "BVerfG-konforme automatisierte Datenanalyse: Verhältnismäßigkeit, Transparenz und Nachvollziehbarkeit",
                  "Entity Resolution: Fuzzy-Matching erkennt verschiedene Schreibweisen derselben Person/Organisation",
                  "Automatisierte Plausibilitätsprüfung: Graph-Algorithmen identifizieren Widersprüche und Lücken"
                ]
              }
            ].map((bp, bpIndex) => {
              const BpIcon = bp.icon
              return (
                <motion.div
                  key={bpIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: bpIndex * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${bp.color}15` }}>
                          <BpIcon className="h-7 w-7" style={{ color: bp.color }} />
                        </div>
                        <CardTitle className="text-lg">{bp.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {bp.practices.map((practice, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION: Grenzüberschreitende Zusammenarbeit ── */}
      <section id="cooperation" className="py-32 bg-primary/5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Schritt 7: Internationale Kooperation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Grenzüberschreitende Zusammenarbeit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Moderne Kriminalität kennt keine Grenzen. Die Zerschlagung von Hydra Market zeigt:
              Nur das koordinierte Zusammenwirken internationaler Behörden führt zum Erfolg.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Operation Hydra: Das Modell",
                icon: Network,
                color: "oklch(0.55 0.22 25)",
                description: "Die Zerschlagung von Hydra Market am 5. April 2022 ist ein Musterbeispiel für erfolgreiche internationale Kooperation.",
                facts: [
                  { label: "Federführung", value: "BKA (Deutschland) + ZIT Frankfurt" },
                  { label: "US-Partner", value: "DOJ, FBI, DEA, IRS-CI, HSI, USPIS (JCODE)" },
                  { label: "Sanktionen", value: "OFAC – >100 Krypto-Adressen auf SDN-Liste" },
                  { label: "Russische Justiz", value: "Moskauer Regionalgericht – Lebenslänglich" },
                  { label: "Estland", value: "FIU – Garantex-Lizenzentzug Feb 2022" },
                  { label: "Ergebnis", value: "543,3 BTC beschlagnahmt, Tagesumsatz –89%" }
                ]
              },
              {
                title: "Institutionelle Rahmenwerke",
                icon: Landmark,
                color: "oklch(0.45 0.12 240)",
                description: "Formale Kooperationsmechanismen ermöglichen den rechtssicheren Informationsaustausch über Grenzen hinweg.",
                facts: [
                  { label: "Europol / EC3", value: "Europäisches Cybercrime Centre – Analyse, Koordination, J-CAT" },
                  { label: "Eurojust", value: "Justizielle Zusammenarbeit – Joint Investigation Teams (JITs)" },
                  { label: "MLATs", value: "Bilaterale Rechtshilfeabkommen – z.B. DE-US, DE-RU" },
                  { label: "JCODE (USA)", value: "Joint Criminal Opioid & Darknet Enforcement – FBI, DEA, IRS-CI" },
                  { label: "Interpol I-24/7", value: "Globales Polizei-Kommunikationsnetzwerk – 195 Länder" },
                  { label: "Five Eyes + ", value: "Nachrichtendienstlicher Austausch – UK, US, CA, AU, NZ + Partner" }
                ]
              },
              {
                title: "Technische Interoperabilität",
                icon: Database,
                color: "oklch(0.55 0.18 200)",
                description: "Standardisierte Datenformate und sichere Austauschkanäle sind die technische Basis jeder Kooperation.",
                facts: [
                  { label: "STIX/TAXII", value: "Automatisierter Echtzeit-Austausch von Threat Intelligence" },
                  { label: "SIENA", value: "Europols Secure Information Exchange Network" },
                  { label: "Prümer Vertrag", value: "Automatischer DNA-, Fingerabdruck- und Kfz-Abgleich (EU)" },
                  { label: "XPolizei 2.0", value: "Interoperabilität der 16+1 deutschen Polizeien" },
                  { label: "Blockchain Analytics", value: "Chainalysis, Elliptic, TRM Labs – gemeinsame Werkzeuge" },
                  { label: "Föderierter Knowledge Graph", value: "Jede Behörde behält Datenhoheit" }
                ]
              }
            ].map((pillar, pIndex) => {
              const PillarIcon = pillar.icon
              return (
                <motion.div
                  key={pIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: pIndex * 0.15 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${pillar.color}15` }}>
                          <PillarIcon className="h-7 w-7" style={{ color: pillar.color }} />
                        </div>
                        <CardTitle className="text-lg">{pillar.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {pillar.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pillar.facts.map((fact, i) => (
                          <div key={i} className="flex gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <Badge variant="outline" className="text-[10px] flex-shrink-0 h-fit mt-0.5 whitespace-nowrap">
                              {fact.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground leading-relaxed">{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-accent/30 bg-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Handshake className="h-5 w-5 text-accent" />
                    Lessons Learned: Hydra Market
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Parallel ermitteln, koordiniert zuschlagen: BKA beschlagnahmte Server am selben Tag, an dem OFAC Sanktionen verhängte und DOJ die Anklage veröffentlichte",
                    "Verschiedene Rechtssysteme nutzen: Deutsches Strafrecht für Server-Beschlagnahmung, US-Sanktionsrecht für Kryptobörsen, russisches Strafrecht für Betreiber",
                    "Blockchain-Forensik als Brücke: On-Chain-Daten sind jurisdiktionsübergreifend verfügbar und bieten objektive Beweismittel",
                    "Timing ist entscheidend: Estlands Lizenzentzug (Feb), BKA-Zugriff (Apr), OFAC-Sanktionen (Apr) — orchestrierte Eskalation"
                  ].map((lesson, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{lesson}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Knowledge Graph als Kooperationsplattform
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Föderierter Knowledge Graph: Jede Behörde behält Datenhoheit (Data Sovereignty), teilt aber Erkenntnisse über standardisierte STIX-2.1-Schnittstellen",
                    "Granulare Zugriffssteuerung (ABAC): Rollenbasierte und attributbasierte Freigabe — vom einzelnen Knoten bis zur Ermittlungsgruppe",
                    "Vollständige Auditierbarkeit: Jeder Zugriff, jede Abfrage, jeder Datenexport wird unveränderlich protokolliert",
                    "Multi-jurisdiktionale Normprüfung: Automatische Validierung von Maßnahmen gegen die jeweiligen nationalen Rechtsgrundlagen aller beteiligten Staaten"
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION: Proprietary vs. Open Ontologies (Palantir-Kontext) ── */}
      <section id="open-ontologies" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              Schritt 8: Proprietär vs. Offen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Warum offene Ontologien die internationale Zusammenarbeit stärken
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Polizeiliche Datenanalyse-Plattformen wie Palantir Gotham und Foundry setzen auf
              proprietäre Datenmodelle. Das schafft Abhängigkeiten und behindert den Austausch
              zwischen Behörden – gerade dort, wo organisierte Kriminalität längst grenzenlos agiert.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-destructive/15">
                      <Lock className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Proprietäre Datenmodelle</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    Beispiel Palantir: Die „Ontology“ in Foundry und Gotham ist ein
                    herstellereigenes Konstrukt, das nicht standardisiert offen liegt.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      {
                        label: "Vendor Lock-in",
                        text: "Datenmodell, Pipelines und Anwendungslogik sind eng an die Plattform gekoppelt. Ein Wechsel verursacht hohe Migrationskosten."
                      },
                      {
                        label: "Begrenzte Interoperabilität",
                        text: "Datenaustausch zwischen zwei Behörden, die unterschiedliche Plattformen oder Konfigurationen nutzen, erfordert Sonderschnittstellen – oft pro Länderpaar."
                      },
                      {
                        label: "Eingeschränkte Auditierbarkeit",
                        text: "Quellcode und semantische Schicht sind nicht öffentlich prüfbar. Externe Forschung und unabhängige Verifikation sind erschwert."
                      },
                      {
                        label: "Verfassungs- und Datenschutzfragen",
                        text: "Das BVerfG (1 BvR 1547/19, 16.02.2023) erklärte automatisierte Datenanalyse in HE/HH in der damaligen Fassung für verfassungswidrig – fehlende Eingriffsschwellen, fehlende Transparenz."
                      },
                      {
                        label: "Souveränitätsrisiko",
                        text: "Wenn Daten­definitionen, Updates und Betrieb von einem Anbieter außerhalb der EU abhängen, ist die digitale Souveränität europäischer Behörden eingeschränkt."
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 p-3 rounded-lg bg-background/60">
                        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-foreground mb-1">{item.label}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-primary/15">
                      <Network className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Offene Ontologien</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    Standardisierte, öffentlich dokumentierte Datenmodelle (STIX 2.1, XPolizei 2.0,
                    Europol UMF, W3C/OWL) machen Wissen zwischen Behörden teilbar – ohne Lock-in.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      {
                        label: "Semantische Interoperabilität",
                        text: "Eine Person, eine Wallet, ein Ereignis bedeuten dasselbe in BKA, Europol, FBI und Polizei NRW. Daten lassen sich ohne individuelle Mapper austauschen."
                      },
                      {
                        label: "Keine Vendor-Abhängigkeit",
                        text: "Mehrere Implementierungen (Open-Source-Graphdatenbanken, kommerzielle Anbieter, Eigenentwicklung) können denselben Standard sprechen."
                      },
                      {
                        label: "Prüfbarkeit & Wissenschaft",
                        text: "Schemas, Taxonomien und Inferenzregeln sind öffentlich versioniert. Forschung, Datenschutzbeauftragte und Gerichte können sie unabhängig prüfen."
                      },
                      {
                        label: "Grenzüberschreitende Ermittlungen",
                        text: "Prümer Vertrag, SIENA, Joint Investigation Teams, EEA – all diese Kooperationsinstrumente sind auf gemeinsame Datendefinitionen angewiesen."
                      },
                      {
                        label: "EU-Souveränität",
                        text: "Offene Standards passen zu Gaia-X, IDS-Konnektoren und der EU-Strategie für digitale Souveränität – Daten bleiben in behördlicher Hoheit."
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 p-3 rounded-lg bg-background/60">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-foreground mb-1">{item.label}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-accent/30 bg-accent/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Warum das für den Kampf gegen organisierte Kriminalität entscheidend ist
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Operation Hydra hat gezeigt: Täter operieren über zehn Länder, dutzende
                      Plattformen und mehrere Rechtsräume hinweg. Eine Ermittlung gelingt nur,
                      wenn BKA, Europol, US-Behörden und nationale FIUs in derselben Sprache über
                      dieselben Entitäten reden – in Echtzeit, mit prüfbarer Beweiskette.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Proprietäre Datenmodelle erzwingen bilaterale Sondermappings, verzögern
                      gemeinsame Auswertungen und konzentrieren kritisches Wissen bei wenigen
                      Anbietern. Offene Ontologien dagegen sind die technische Grundlage dafür,
                      dass Europa als Rechtsraum schneller, transparenter und souveräner gegen
                      organisierte Kriminalität handeln kann – ohne die Kontrolle über das
                      Datenmodell aus der Hand zu geben.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <BrandMark />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Demo: Knowledge Graph & GraphRAG für Ermittlungen — fiktiver Beispielfall, keine Produktwerbung.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function GraphErrorFallback({ error }: { error: Error }) {
  return (
    <div className="w-full h-full min-h-[600px] rounded-lg bg-card border flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-3">
        <h3 className="text-lg font-semibold">3D-Knowledge-Graph konnte nicht geladen werden</h3>
        <p className="text-sm text-muted-foreground">
          Die interaktive 3D-Visualisierung steht aktuell nicht zur Verfügung. Die übrigen Inhalte
          dieser Seite sind weiterhin nutzbar.
        </p>
        <p className="text-xs text-muted-foreground/70 break-words">{error.message}</p>
      </div>
    </div>
  )
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
        IG
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        InvestiGraph
      </span>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/10 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  )
}

export default App
