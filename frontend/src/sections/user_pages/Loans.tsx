import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import api from "@/types/api";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { LoansType } from "@/types";
import type { ProtectedRouteContext } from "@/ProtectedRoute";

function Loans() {
  const [loans, setLoans] = useState<LoansType[]>([]);
  const [err, setErr] = useState("");
  const { user } = useOutletContext<ProtectedRouteContext>();
  const [today] = useState(() => Date.now());

  useEffect(() => {
    api.get("/loans/" + user.userId).then((res) => {
      if (res.status == 200) {
        setLoans(res.data.data);
      } else {
        setErr(res.data.message);
      }
    });
  }, [user.userId]);

  //calculate the difference in time
  const calculateDays = (due_date: string) => {
    return Math.ceil(
      (new Date(due_date).getTime() - today) / (1000 * 60 * 60 * 24),
    );
  };

  return (
    <main>
      {loans.length > 0 ? (
        <>
          <h1 className="text-3xl mt-5">Omat lainat</h1>
          <p className="text-l my-1">
            Sinulla on {loans.length} kirjaa lainassa. Palauta kirjat ajallaan
            välttääksesi sakkoja.
          </p>
          <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loans.map((l) => (
              <Card
                className="h-full rounded-lg border border-border/70 bg-card p-5 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                key={l.id}
              >
                <CardHeader className="gap-1 px-0 pb-0">
                  <CardTitle className="break-words text-lg font-semibold">
                    {l.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {l.writer} · lainattu{" "}
                    {new Date(l.reservation_date).toLocaleDateString("fi-FI")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex w-full flex-col items-start gap-2 rounded-md border-t border-border/60 bg-muted/30 px-0 pt-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Palautuspäivä{" "}
                    {new Date(l.due_date).toLocaleDateString("fi-FI")}
                  </span>
                  {calculateDays(l.due_date) == 0 ? (
                    <Label className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      Palauttaa tänään
                    </Label>
                  ) : calculateDays(l.due_date) < 0 ? (
                    <Label className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
                      Myöhässä {Math.abs(calculateDays(l.due_date))} pv
                    </Label>
                  ) : (
                    <Label className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {calculateDays(l.due_date)} pv jäljellä
                    </Label>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>{err}</h1>
        </>
      )}
    </main>
  );
}

export default Loans;
