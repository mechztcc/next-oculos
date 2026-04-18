import { Eye, PenLine, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OfferStatus = "aceito" | "andamento" | "recusado" | "preparando" | "concluido";

type OfferRow = {
  id: string;
  pedido: string;
  loja: string;
  responsavel: string;
  phone: string;
  valor: string;
  status: OfferStatus;
};

const mockOffers: OfferRow[] = [
  {
    id: "1",
    pedido: "#1042",
    loja: "Ótica Central",
    responsavel: "Mariana Souza",
    phone: "+55 (11) 98888-1111",
    valor: "R$ 289,90",
    status: "andamento",
  },
  {
    id: "2",
    pedido: "#1041",
    loja: "Ótica Vision",
    responsavel: "Carlos Lima",
    phone: "+55 (21) 97777-2222",
    valor: "R$ 349,00",
    status: "aceito",
  },
  {
    id: "3",
    pedido: "#1039",
    loja: "Ótica Boa Vista",
    responsavel: "Fernanda Alves",
    phone: "+55 (31) 96666-3333",
    valor: "R$ 199,90",
    status: "recusado",
  },
];

function getStatusBadgeVariant(status: OfferStatus) {
  if (status === "aceito") return "default" as const;
  if (status === "recusado") return "destructive" as const;
  return "secondary" as const;
}

export default function HistoricoPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Minhas ofertas
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Veja as ofertas que as lojas enviaram para você.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Buscar ofertas..."
            className="h-11 rounded-full pl-10"
            data-testid="orders-search-input"
          />
        </div>

        <Button
          type="button"
          className="h-11"
          data-testid="offers-new-order-button"
        >
          Novo pedido
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <Table>
          <TableHeader className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-900/40 dark:text-zinc-400">
            <TableRow>
              <TableHead className="px-4 py-3">Pedido</TableHead>
              <TableHead className="px-4 py-3">Loja</TableHead>
              <TableHead className="px-4 py-3">Responsável</TableHead>
              <TableHead className="px-4 py-3">Phone</TableHead>
              <TableHead className="px-4 py-3">Valor</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {mockOffers.map((row) => (
              <TableRow key={row.id} className="text-zinc-900 dark:text-zinc-50">
                <TableCell className="px-4 py-3 font-medium">{row.pedido}</TableCell>
                <TableCell className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {row.loja}
                </TableCell>
                <TableCell className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {row.responsavel}
                </TableCell>
                <TableCell className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {row.phone}
                </TableCell>
                <TableCell className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {row.valor}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-9"
                      data-testid={`orders-row-${row.id}-view-button`}
                      aria-label={`Ver pedido ${row.pedido}`}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-9"
                      data-testid={`orders-row-${row.id}-edit-button`}
                      aria-label={`Editar pedido ${row.pedido}`}
                    >
                      <PenLine className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
