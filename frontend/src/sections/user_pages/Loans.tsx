import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import api from "@/api";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { User, LoansType } from "@/types";

function Loans() {
  const [loans, setLoans] = useState<LoansType[]>([]);
  const [err, setErr] = useState("");
  const user = useOutletContext<User>();
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
              <Card className="max-w-100 p-4" key={l.id}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-2 items-center justify-between">
                    <CardTitle>{l.title}</CardTitle>
                    <CardDescription>
                      {l.writer} . lainattu {l.reservation_date}
                    </CardDescription>
                  </div>

                  <CardContent className="flex flex-col gap-y-2 items-center justify-between gap-4">
                    {calculateDays(l.due_date) == 0 ? (
                      <Label>Palauttaa tänään</Label>
                    ) : calculateDays(l.due_date) < 0 ? (
                      <Label>
                        Myöhässä {Math.abs(calculateDays(l.due_date))} pv
                      </Label>
                    ) : (
                      <Label className="text-muted-foreground">
                        Eräpäivä {l.due_date}, {calculateDays(l.due_date)} pv
                        jäljellä
                      </Label>
                    )}
                  </CardContent>
                </div>
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
