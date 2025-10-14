"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ChartLineIcon, CopyIcon, QrCodeIcon, TagIcon } from "lucide-react";
import { useCreateShortUrl } from "../hooks/use-create-shorturl";
import { ShortUrlResponse } from "@/api/create-shorturl.api";

export default function Home() {
  const [url, setUrl] = useState("https://tanstack.com/query/v5/docs/framework/react/installation");
  const [shorteneds, setShorteneds] = useState<ShortUrlResponse[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const {data, status, mutate: createShortUrl, isSuccess } = useCreateShortUrl();

  
useEffect(()=> {
  if (!data) return;
    setShorteneds(prev => {
      if (!prev.find(item => item.id === data.id)) {
        return [...prev, data];
      }
      return prev;
    });
       setShowDialog(true);
   
}, [isSuccess])

  function handleShorten() {
    if (!url) return;
    createShortUrl(url);
    setShowDialog(true);
  }

  return (
    <main className="mt-20 flex flex-col items-center min-h-screen bg-gray-50 px-4 py-12">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Links longos? Transforme em resultados.</h1>
        <p className="text-lg text-gray-600 mb-6">
          Encurte, personalize e monitore seus links em segundos. Descubra quem clica e otimize sua estratégia digital com facilidade.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4">
          <Input
            placeholder="Cole sua URL longa aqui..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="sm:w-96"
          />
          <Button onClick={handleShorten} className="w-full sm:w-auto">Crie seu link grátis agora</Button>
        </div>
        <span className="text-xs text-gray-400">Experimente sem cadastro!</span>
      </section>
      {/* Links Encurtados */}
      {shorteneds.length > 0 && (
      <section className="w-full max-w-2xl text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Link Encurtado com Sucesso!</h2>
        
          {shorteneds.map((s) => (
              <Card key={s.id}  >
                <CardContent className="flex items-center justify-between gap-2">
                <a href={s.shortedUrl} className="font-bold">{s.shortedUrl}</a>

                <Button onClick={() => {navigator.clipboard.writeText(s.shortedUrl);}}><CopyIcon /></Button>
                </CardContent>
              </Card>
          ))}
       
        <Button onClick={() => setShowDialog(false)}>Fechar</Button>
      </section>
      )}

      {/* Social Proof */}
      <section className="w-full max-w-2xl text-center mb-12">
        <p className="text-gray-500 mb-4">Junte-se a milhares de criadores que já confiam em seus links a nós.</p>
        <div className="flex flex-wrap justify-center gap-6 opacity-80">
          <Avatar><AvatarFallback>AC</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>PXYZ</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>ID</AvatarFallback></Avatar>
          <span className="text-sm text-gray-400 flex items-center">Agência Criativa</span>
          <span className="text-sm text-gray-400 flex items-center">Podcast XYZ</span>
          <span className="text-sm text-gray-400 flex items-center">Influencer Digital</span>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-center mb-8">Mais que um encurtador. Uma ferramenta de crescimento.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                {/* Ícone: gráfico de barras */}
                <span role="img" aria-label="Gráfico de barras" className="text-3xl"><ChartLineIcon></ChartLineIcon></span>
              </div>
              <CardTitle>Métricas ao seu alcance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Saiba exatamente quantas pessoas clicaram, de onde elas vieram e quais canais trazem mais resultado. Tome decisões baseadas em dados, não em suposições.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                {/* Ícone: etiqueta de preço */}
                <span role="img" aria-label="Etiqueta de preço" className="text-3xl"><TagIcon /></span>
              </div>
              <CardTitle>Links com a sua marca</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Fortaleça sua marca personalizando suas URLs. Links customizados são mais confiáveis e aumentam a taxa de cliques em até 39%.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                {/* Ícone: QR Code estilizado */}
                <span role="img" aria-label="QR Code" className="text-3xl"><QrCodeIcon></QrCodeIcon></span>
              </div>
              <CardTitle>Compartilhe com QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Leve sua audiência do mundo físico para o online sem esforço. Gere QR Codes dinâmicos para seus links e use-os em cartões de visita, embalagens ou eventos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Comece em menos de 60 segundos.</h2>
        <ol className="space-y-4 text-gray-700">
          <li><Badge className="mr-2">1</Badge> <b>Cole sua URL:</b> Cole o link longo que você deseja encurtar.</li>
          <li><Badge className="mr-2">2</Badge> <b>Personalize (Opcional):</b> Edite o final do link para deixá-lo com a sua cara.</li>
          <li><Badge className="mr-2">3</Badge> <b>Compartilhe e Monitore:</b> Copie seu novo link ou QR Code e acompanhe as métricas em tempo real no seu painel.</li>
        </ol>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">O que dizem nossos usuários</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar><AvatarFallback>AP</AvatarFallback></Avatar>
              <div>
                <CardTitle className="text-base">Ana P., Gerente de Marketing</CardTitle>
                <Badge className="bg-green-100 text-green-800">Profissional de Marketing</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                "A shorturl mudou o jogo para nossas campanhas de email. Finalmente consigo ver qual chamada para ação funciona melhor. É simples, direto e os dados são incrivelmente úteis!"
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar><AvatarFallback>MV</AvatarFallback></Avatar>
              <div>
                <CardTitle className="text-base">Marcos V., YouTuber</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">Criador de Conteúdo</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                "Eu uso a shorturl para todos os links de afiliados no meu canal do YouTube. A personalização ajuda a manter a confiança da minha audiência e o painel de métricas é super fácil de entender."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Pronto para otimizar seus links?</h2>
        <p className="text-gray-600 mb-4">Crie sua conta gratuita e comece a tomar decisões mais inteligentes hoje mesmo. Sem necessidade de cartão de crédito.</p>
        <Button size="lg" className="text-lg px-8 py-4">Quero começar gratuitamente</Button>
      </section>

      {/* Dialog de resultado do encurtador */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seu link encurtado está pronto!</DialogTitle>
          </DialogHeader>
          
        </DialogContent>
      </Dialog>
    </main>
  );
}

