import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as plannersService from '../../../services/planners';

import Bottom from '../../shared/ImageWrappers/Bottom/Bottom';

import styles from './Dashboard.module.css';

function Dashboard() {
    //todo create var for the images

    const [planners, setPlanners] = useState([]);

    useEffect(() => {
        plannersService
            .all()
            .then((res) => setPlanners(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="dashboard section section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">Plan you wedding</h2>
            </div>
            <div className={styles["dashboard-content-wrapper"]}>
                <div className={styles["dashboard-left-wrapper"]}>
                    <h2 className={styles["dashboard-left-title"]}>My planners</h2>
                    {planners.length
                        ? planners.map((p) => <Link to={`/wedding/${p.id}`} />)
                        : <p className={styles["dashboard-left-no-planners"]}>No planners yet</p>
                    }
                </div>
                <div className={styles["dashboard-right-wrapper"]}>
                    <Link to="/plan/create" className='btn'>Create new planner</Link>
                </div>
            </div>
            <Bottom
                first="bunch-of-flowers-363169_1920.jpg"
                second="wedding-1760024_1920.jpg"
                third="wedding-905240_1920.jpg"
            />
        </section>
    );
}

export default Dashboard;