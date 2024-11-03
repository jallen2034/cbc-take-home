import styles from './page.module.css'
import { buildTotalJobHierarchy } from "@/app/helpers";
import { JobItem } from "@/app/types";

// Main component to display the data.
export default async function Home() {
  const res: Response = await fetch('http://localhost:3000/data/composition-data.json');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  // Parse the json data and display it before we attempt to calculate the job hierarchy later on.
  const jobData: JobItem[] = await res.json();
  const testItem = await buildTotalJobHierarchy(jobData, 283); // Example jobId
  console.log(testItem);
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
}
