import { useState } from "react";
import useSWR from "swr";

import VisitsChart from "@components/VisitsChart";
import HostSelector from "@components/HostSelector";
import PeriodSelector from "@components/PeriodSelector";

import styles from "@styles/Home.module.css";

const fetcher = (key) => fetch(key).then((res) => res.json());

export default function Home() {
  const [period, setPeriod] = useState("h");
  const [host, setHost] = useState({ key: "" });

  const { data } = useSWR(
    `/api/data?period=${period}&host=${host.key}`,
    fetcher
  );

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <HostSelector
          value={host}
          onChange={(value) => {
            console.log("value:", value);
            setHost(value || { key: "" });
          }}
        />
        <div style={{ flexGrow: 1 }} />
        <PeriodSelector value={period} onChange={(value) => setPeriod(value)} />
      </div>
      {data?.series && (
        <p className={styles.total}>Total visits: {data.total}</p>
      )}
      <div className={styles.chart}>
        {data?.series?.[0]?.data && <VisitsChart data={data.series} />}
      </div>
    </div>
  );
}
