import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';
import { getCurrency } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addAllData } from './Redux/Actions/vacancyAC';
import { getAllVacancies } from './Redux/Reducers/vacancyReducer';
import { Search } from './Components/Search/search';
import { SkillsChart } from './Components/Charts/SkillsChart/SkillsChart';
import { ExperienceChart } from './Components/Charts/ExperienceChart/experienceChart';
import { ScheduleChart } from './Components/Charts/ScheduleChart/scheduleChart';
import { SalaryByExperienceChart } from './Components/Charts/SalaryByExperienceChart/salaryByExperienceChart';
import { CitiesChart } from './Components/Charts/CitiesChart/CitiesChart';
import ProgressBar from './Components/ProgressBar/progressBar';
import { StatBlock } from './Components/StatBlock/statBlock';

const regions = [
  { code: 5, name: 'Азербайджан' },
  { code: 16, name: 'Беларусь' },
  { code: 28, name: 'Грузия' },
  { code: 40, name: 'Казахстан' },
  { code: 48, name: 'Кыргызстан' },
  { code: 97, name: 'Узбекистан' },
  { code: 113, name: 'Россия' },
];

function App() {
  const { vacancy } = useSelector(state => ({ vacancy: state.vacancy.vacancy }));
  const { top10Skills } = useSelector(state => ({ top10Skills: state.vacancy.top10Skills }));
  const { experience } = useSelector(state => ({ experience: state.vacancy.experience }));
  const { schedule } = useSelector(state => ({ schedule: state.vacancy.schedule }));
  const { salaryStat } = useSelector(state => ({ salaryStat: state.vacancy.salaryStat }));
  const { salaryByExperience } = useSelector(state => ({ salaryByExperience: state.vacancy.salaryByExperience }));
  const { cities } = useSelector(state => ({ cities: state.vacancy.cities }));
  const { vacancyName } = useSelector(state => ({ vacancyName: state.vacancy.vacancyName }));
  const { pageLoad } = useSelector(state => ({ pageLoad: state.vacancy.currentPage }));
  const { allPage } = useSelector(state => ({ allPage: state.vacancy.pages }));
  const { allDataLoaded } = useSelector(state => ({ allDataLoaded: state.vacancy.allDataLoaded }));

  const [currencies, setCurrencies] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(113); 
  const [modalOpen, setModalOpen] = useState(false);

  const handleExportButtonClick = () => {
    if (pageLoad === allPage && vacancy.length === 0) {
      setModalOpen(true);
    }
    else{
      exportToPDF()
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrency.getCurrencyValues().then(response => { 
      setCurrencies(response.conversion_rates);
    });
  }, []);

  const handleSetClick = () => {
    dispatch(addAllData({ currencies }));
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);

  };

  const exportToPDF = () => {
    const input = document.getElementById('app-container'); // Замените 'app-container' на ID вашего контейнера
    html2pdf(input, {
      margin: 10,
      filename: 'stats.pdf',
      image: { type: 'png', quality: 1 },
      html2canvas: { dpi: 300, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a2', orientation: 'portrait' }
    });
  };

  return (
    <body className="app__body">
      <div className="app">
        <div id="app-container" className="app__container">
          <header className="header">
            <div className="header__container">
              <div className='search__container'>
                <Search dispatch={dispatch} getAllVacancies={getAllVacancies} currencies={currencies} region={selectedRegion} />
              </div>
              <div className="region-selector__container">
                <label className="region-selector__label" htmlFor="region-selector">Регион:</label>
                <div class="custom-select">
                  <select id="region-selector" className="region__selector" onChange={handleRegionChange} value={selectedRegion}>
                    {regions.map(region => (
                      <option key={region.code} value={region.code}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  <div class="select-arrow"></div>
                </div>
              </div>
            </div>
          </header>

          <main className="main">
            {pageLoad !== allPage ? (
              <ProgressBar
                  className="progress-bar"
                  bgcolor={"#6a1b9a"}
                  completed={allPage > 1 ? Math.trunc((pageLoad / (allPage - 1)) * 100) : 100}
              />
              ) : ""}
              {(pageLoad===allPage && vacancy.length !== 0 )  ? <button className="show-data-btn" onClick={handleSetClick}>Показать данные</button> : ""}
              <div className="main__stat">
                {vacancy.length !== 0 ? <p>Количество вакансий по запросу "{vacancyName}": {vacancy.length}</p> : pageLoad ? "По вашему запросу ничего не найдено" : ""}
                <div className="main__stat-salary">
                  <StatBlock isVisible={allDataLoaded} statName="Количество вакансий" statElement={vacancy.length}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="Максимальная З/П" statElement={salaryStat.max} icon={"$"}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="Средняя З/П" statElement={salaryStat.middle} icon={"$"}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="Минимальная З/П" statElement={salaryStat.min} icon={"$"}></StatBlock>
                </div>
              </div>
                <div className="main__stat-charts">
                    <div className='main__stat-up'>
                        <div className="chart-wrapper">
                          <ExperienceChart experience={experience} />
                        </div>
                        <div className="chart-wrapper">
                          <ScheduleChart schedule={schedule} />
                        </div>
                        <div className="chart-wrapper">
                        <CitiesChart cities={cities} />
                      </div>
                      </div>
                    <div className='main__stat-down'>
                      <div className="chart-wrapper">
                        <SkillsChart keySkills={top10Skills} />
                      </div>
                      <div className="chart-wrapper">
                        <SalaryByExperienceChart experienceBySalary={salaryByExperience} />
                      </div>
                    </div>
                </div>
          </main>
          <footer className="footer">
            <p className="footer__info">Этот веб-сервис для аналитики рынка труда. Здесь вы можете получить информацию о вакансиях, зарплатах, навыках и других аспектах рынка труда.</p>
            <button
                className={`export-btn ${pageLoad === allPage && vacancy.length !== 0 ? 'disabled' : ''}`}
                onClick={handleExportButtonClick}
              >
                Экспортировать в PDF
              </button>
              {modalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                    <p>Для начала вам нужно получить статистику.</p>
                  </div>
                </div>
              )}
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;