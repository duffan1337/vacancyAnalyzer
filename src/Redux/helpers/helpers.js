export const getSalaryStat = (vacancies, currencies) => {
    let salary = getSalary(vacancies, currencies);
    let allSalary = salary.from.concat(salary.to);

    const min = Math.min(...allSalary);
    const max = Math.max(...allSalary);
    const middle = Math.trunc(allSalary.reduce((a, b) => (a + b)) / allSalary.length);
    return {
        max: max,
        min: min,
        middle: middle
    };
};

export const setSchedule = (items) => {
    let arrayOfEmployment = items.map(item => {
        return item.schedule;
    });

    let EmploymentStat = { remote: 0, fullDay: 0, flexible: 0 };

    for (let x in arrayOfEmployment) {
        if (arrayOfEmployment[x].id === "remote") {
            EmploymentStat = { ...EmploymentStat, remote: EmploymentStat.remote += 1 };
        } else if (arrayOfEmployment[x].id === "fullDay") {
            EmploymentStat = { ...EmploymentStat, fullDay: EmploymentStat.fullDay += 1 };
        } else if (arrayOfEmployment[x].id === "flexible") {
            EmploymentStat = { ...EmploymentStat, flexible: EmploymentStat.flexible += 1 };
        }
    }
    return EmploymentStat;
};

export const setExperience = (items) => {
    let arrayOfExperience = items.map(item => {
        return item.experience.id;
    });

    let ExperienceStat = { between1And3: 0, between3And6: 0, noExperience: 0, moreThan6: 0 };

    for (let x in arrayOfExperience) {
        if (arrayOfExperience[x] === "between1And3") {
            ExperienceStat = { ...ExperienceStat, between1And3: ExperienceStat.between1And3 += 1 };
        } else if (arrayOfExperience[x] === "between3And6") {
            ExperienceStat = { ...ExperienceStat, between3And6: ExperienceStat.between3And6 += 1 };
        } else if (arrayOfExperience[x] === "noExperience") {
            ExperienceStat = { ...ExperienceStat, noExperience: ExperienceStat.noExperience += 1 };
        } else if (arrayOfExperience[x] === "moreThan6") {
            ExperienceStat = { ...ExperienceStat, moreThan6: ExperienceStat.noExperience += 1 };
        }
    }
    return ExperienceStat;
};

export const setTop10Skills = (items) => {
    let keySkillsStats = { items: [] };
    Array.from(items, el => Array.from(el.key_skills, (item) => { keySkillsStats = { ...keySkillsStats, items: [...keySkillsStats.items, item.name] } }));

    let map = keySkillsStats.items.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    var sortable = [];
    for (var count in map) {
        sortable.push([count, map[count]]);
    }

    let top = sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    let top10Skills = top.slice(0, 10);

    return top10Skills;
};

export const setCities = (items) => {
    let filteredCitiesArray = items.filter(el => el.address !== null && el.address.city !== null).map(el => el.address.city);

    let map = filteredCitiesArray.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let sortable = [];
    for (const count in map) {
        sortable.push([count, map[count]]);
    }
    let top = sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    let top10Cities = top.slice(0, 10);

    return top10Cities;
};
const setSalaryByExperience = (vacancyItems,currencies) =>{

    let ExperienceBySalary={between1And3:[], between3And6:[],noExperience:[], moreThan6:[]}

        for (let x in vacancyItems) {
          if(vacancyItems[x].experience.id ==="between1And3")
          {
            ExperienceBySalary= {...ExperienceBySalary, between1And3: [...ExperienceBySalary.between1And3, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="between3And6")
          {
            ExperienceBySalary= {...ExperienceBySalary, between3And6: [...ExperienceBySalary.between3And6, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="noExperience")
          {
            ExperienceBySalary= {...ExperienceBySalary, noExperience: [...ExperienceBySalary.noExperience, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="moreThan6")
          {
            ExperienceBySalary= {...ExperienceBySalary, moreThan6: [...ExperienceBySalary.moreThan6, vacancyItems[x]]}
          }
        }

    
          let between1And3 =getSalary(ExperienceBySalary.between1And3,currencies)
          let between3And6=getSalary(ExperienceBySalary.between3And6,currencies)
          let noExperience = getSalary(ExperienceBySalary.noExperience,currencies)
          let moreThan6 =getSalary(ExperienceBySalary.moreThan6,currencies)
          let AVGbetween1And3= getAvg(between1And3.from.concat(between1And3.to))
          let AVGbetween3And6= getAvg(between3And6.from.concat(between3And6.to))
          let AVGnoExperience= getAvg(noExperience.from.concat(noExperience.to))
          let AVGmoreThan6= getAvg(moreThan6.from.concat(moreThan6.to))
  
        return {AVGnoExperience, AVGbetween1And3, AVGbetween3And6, AVGmoreThan6}       
  }


  const getSalary = (Vacancy,currencies) =>{
    console.log(currencies)
    let HHCurrencies = {
      KZT:currencies.KZT,
      RUR:currencies.RUB,
      BYR:currencies.BYN,
      USD:currencies.USD,
      EUR:currencies.EUR,
      UAH:currencies.UAH,
    }  
    let filterFrom = Vacancy.filter(el => el.salary.from !== null && el.salary.from !== 0 )
      let from = filterFrom.map(item => 
        {      
          if(item.salary.currency !== "USD")
          {
            let el;
            for (let currency in HHCurrencies) 
            {
             if(currency===item.salary.currency)
             {
             el =Math.trunc((item.salary.from)/HHCurrencies[currency])
             }
             
            }
            return el
      }
      else
      {
        return item.salary.from
      }
    })
           
    let filterTo = Vacancy.filter(el => el.salary.to !== null && el.salary.to !==0 )
    let to = filterTo.map(item => 
      {         
        if(item.salary.currency !== "USD")
        {
          let el;
          for (let currency in HHCurrencies) 
          {
           if(currency===item.salary.currency)
           {
           el=Math.trunc(item.salary.to / HHCurrencies[currency])
           }
           
        }
          return el
    }
    else{
      return  item.salary.to 
    }
  })
      return {from:from, to:to}
}



function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return Math.trunc(total / grades.length);
  }

