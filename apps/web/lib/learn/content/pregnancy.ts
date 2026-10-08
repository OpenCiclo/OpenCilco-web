// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const PREGNANCY_ARTICLES: LearnArticle[] = [
  {
    slug: "early-pregnancy-signs",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Signs and symptoms of pregnancy", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/signs-and-symptoms-of-pregnancy/" },
      { label: "NHS — Doing a pregnancy test", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/" },
      { label: "NHS — Ectopic pregnancy", href: "https://www.nhs.uk/conditions/ectopic-pregnancy/" },
      { label: "MedlinePlus — Miscarriage", href: "https://medlineplus.gov/miscarriage.html" },
      { label: "CDC — Urgent maternal warning signs", href: "https://www.cdc.gov/hearher/maternal-warning-signs/index.html" },
    ],
    related: ["pregnancy-tests", "missed-periods", "ectopic-pregnancy"],
    en: {
      title: "Early signs of pregnancy",
      summary: "For most people, the first sign of pregnancy is a period that does not come. Feeling sick, tiredness and sore breasts are common too, but not everyone gets them.",
      sections: [
        {
          heading: "A missed period",
          body: "For most people, the first clue is a period that does not come. If your cycles vary a lot, it can be harder to tell when a period is late. Logging your periods in Ciclo can make it easier to notice when one has not come. Most pregnancy tests work from the first day of a missed period. If you do not know when your period is due, test at least 21 days after you last had sex without contraception.",
        },
        {
          heading: "Feeling sick and tired",
          body: "Many people feel sick or are sick in early pregnancy. It is often called morning sickness, but it can come at any hour. It usually starts when you are around 4 to 6 weeks pregnant (counted from the first day of your last period). Many people feel very tired, mostly in the first 3 months. If you have severe sickness and are vomiting a lot, get medical help straight away.",
        },
        {
          heading: "Other changes you may notice",
          body: "Your breasts may get bigger, feel tender or tingle. You may need to pee more often, including at night. Some people get constipation, more vaginal discharge without soreness or irritation, a strange metallic taste in the mouth, or cravings for new foods. No two pregnancies are alike, and you may have only some of these signs, or none. Signs alone cannot tell you for sure; a pregnancy test is the way to find out.",
        },
        {
          heading: "Light bleeding or spotting",
          body: "In the first few weeks, some people have a very light bleed or a little spotting, which can look like a light period. This is called implantation bleeding. Because bleeding in pregnancy can also have other causes, contact a doctor, nurse or midwife if you have any bleeding and think you might be pregnant, especially if you also have pain.",
        },
        {
          heading: "When to get help",
          body: "If your test is positive, contact a doctor, nurse or midwife soon. If you could be pregnant, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of an ectopic pregnancy.",
        },
      ],
      notice: "This is general information. Only a pregnancy test can tell you if you are pregnant. If you are worried about any symptom, talk to a doctor, nurse or midwife.",
    },
  },
  {
    slug: "pregnancy-tests",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Doing a pregnancy test", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/" },
      { label: "MedlinePlus — Pregnancy test", href: "https://medlineplus.gov/lab-tests/pregnancy-test/" },
      { label: "NHS — Ectopic pregnancy", href: "https://www.nhs.uk/conditions/ectopic-pregnancy/" },
      { label: "Office on Women's Health — Pregnancy tests", href: "https://www.womenshealth.gov/a-z-topics/pregnancy-tests" },
    ],
    related: ["early-pregnancy-signs", "unplanned-pregnancy", "healthy-pregnancy"],
    en: {
      title: "Pregnancy tests",
      summary: "Most home pregnancy tests work from the first day of a missed period. A positive result is almost always right; a negative one is less certain if you test early.",
      sections: [
        {
          heading: "How pregnancy tests work",
          body: "Pregnancy tests look for a hormone called human chorionic gonadotrophin (hCG). It is made by the placenta, which grows in the womb and feeds the baby. Your body starts making hCG around 6 days after an egg is fertilised. Home tests check your pee. Blood tests at a clinic can pick up smaller amounts of hCG, sometimes before a missed period.",
        },
        {
          heading: "When to test",
          body: "Most home tests work from the first day of a missed period. Some more sensitive tests can be used before a missed period, but the result is more reliable if you wait until your period is late. If you do not know when your period is due, test at least 21 days after you last had sex without contraception. Your first pee of the morning usually has the most hCG. Avoid drinking a lot of fluid before testing, because it can dilute the hormone. You can log your result in Ciclo next to your period dates.",
        },
        {
          heading: "Reading the result",
          body: "Follow the instructions that come with your test, including how long to wait. After you pee on the stick, the result shows within a few minutes. Used the right way, home tests are reliable. Any line or plus sign you can see, even a faint one, most likely means you are pregnant. A faint line can mean the pregnancy is early and your hCG level is still low. Home urine tests are about 97% to 99% accurate when done a week or two after a missed period.",
        },
        {
          heading: "If the test is negative",
          body: "A negative result is less reliable, especially if you tested early. Your body may not have made enough hCG yet for the test to find it. If you still think you might be pregnant, wait a few days and test again. Some medicines can also affect the result, so check the leaflet or ask a pharmacist. If a second test is negative and your period still has not come, see a doctor or nurse.",
        },
        {
          heading: "After a positive test",
          body: "Whatever you decide, it helps to see a doctor, nurse or midwife soon. If you plan to continue the pregnancy, getting care early matters. If you are not sure what you want to do, a sexual-health or family-planning clinic can talk through your options. If you could be pregnant, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of an ectopic pregnancy.",
        },
      ],
      notice: "This is general information. If your result is unclear or your period still has not come, talk to a doctor, nurse or sexual-health clinic.",
    },
  },
  {
    slug: "healthy-pregnancy",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "MedlinePlus — Prenatal care", href: "https://medlineplus.gov/prenatalcare.html" },
      { label: "Office on Women's Health — Prenatal care and tests", href: "https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests" },
      { label: "CDC — Urgent maternal warning signs", href: "https://www.cdc.gov/hearher/maternal-warning-signs/index.html" },
      { label: "NHS — Vitamins, supplements and nutrition in pregnancy", href: "https://www.nhs.uk/pregnancy/keeping-well/vitamins-supplements-and-nutrition/" },
      { label: "NHS — Foods to avoid in pregnancy", href: "https://www.nhs.uk/pregnancy/keeping-well/foods-to-avoid/" },
    ],
    related: ["preconception-health", "periods-after-birth", "postpartum-depression"],
    en: {
      title: "Prenatal care and a healthy pregnancy",
      summary: "Regular check-ups during pregnancy help spot problems early. Here is what prenatal care involves, habits that help, and warning signs that need care straight away.",
      sections: [
        {
          heading: "What prenatal care is",
          body: "Prenatal care (also called antenatal care) is the health care you get while you are pregnant. It includes regular check-ups and tests. It helps keep you and the baby healthy and lets a doctor or midwife spot problems early. If you plan to continue your pregnancy, contact a doctor, nurse or midwife as soon as you know you are pregnant.",
        },
        {
          heading: "What happens at check-ups",
          body: "In some countries, such as the US, a typical pattern is a check-up about once a month until 28 weeks, twice a month from 28 to 36 weeks, and then every week until the birth. Your own schedule may differ. At most visits your blood pressure and weight are checked, the baby's heartbeat is checked, and your tummy is measured to follow the baby's growth. You will also be offered tests, such as blood tests and ultrasound scans.",
        },
        {
          heading: "Vitamins and medicines",
          body: "Take 400 micrograms of folic acid every day until you are 12 weeks pregnant. It helps prevent birth defects of the brain and spine. Ask about vitamin D too. Do not take vitamin A (retinol) supplements or fish liver oil, because too much vitamin A can harm the baby. Ask your doctor or midwife about healthy eating and how much weight gain is right for you. Always talk to them before you start or stop any medicine, including medicines you buy yourself and herbal remedies.",
        },
        {
          heading: "Food and drink to avoid",
          body: "Some foods can carry infections such as listeria or toxoplasmosis, or contain too much vitamin A. Avoid soft cheeses with a white rind, such as brie, unless thoroughly cooked. Also avoid pâté, raw or undercooked meat, cold cured meats, liver, raw shellfish, and shark, swordfish and marlin. Limit tuna and oily fish, have no more than 200 mg of caffeine a day, and avoid alcohol. Advice differs a little between countries, so ask your midwife what applies to you.",
        },
        {
          heading: "Habits that protect you and the baby",
          body: "Avoid smoking, alcohol and drugs during pregnancy, as they can harm you and the baby. If you find it hard to stop, ask a doctor, nurse or midwife for support. Going to all your check-ups matters too, even when you feel well, because regular checks let your doctor or midwife spot problems early.",
        },
        {
          heading: "Warning signs that need care now",
          body: "Get medical help straight away if you have bleeding or fluid leaking from your vagina, or severe tummy pain that does not go away. Do the same for a headache that will not go away or gets worse, changes in your vision, or extreme swelling of your hands or face. Other urgent signs are a fever of 38°C or higher, chest pain, a racing heart, trouble breathing, fainting, severe vomiting, or extreme tiredness. So is a painful, red or swollen leg or arm, or a baby that moves less or stops moving. Say that you are pregnant. If you have thoughts of harming yourself or your baby, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information. Your doctor or midwife knows your pregnancy best. If something feels wrong, contact them or get urgent help.",
    },
  },
  {
    slug: "miscarriage",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Miscarriage", href: "https://www.nhs.uk/conditions/miscarriage/" },
      { label: "MedlinePlus — Miscarriage", href: "https://medlineplus.gov/miscarriage.html" },
      { label: "Mayo Clinic — Miscarriage: symptoms and causes", href: "https://www.mayoclinic.org/diseases-conditions/pregnancy-loss-miscarriage/symptoms-causes/syc-20354298" },
      { label: "Office on Women's Health — Pregnancy loss", href: "https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/pregnancy-loss" },
    ],
    related: ["ectopic-pregnancy", "healthy-pregnancy", "depression"],
    en: {
      title: "Miscarriage",
      summary: "Losing a pregnancy can be very hard. Here are the signs of miscarriage, when to get help, what happens next and where to find support.",
      sections: [
        {
          heading: "What miscarriage is",
          body: "A miscarriage is when a pregnancy ends on its own in roughly the first half of pregnancy. Depending on the country, doctors use the word for a loss before 20 or 24 weeks. Miscarriage is common. About 10 to 20 in every 100 known pregnancies end in miscarriage, and the true number is higher, because many happen before a person knows they are pregnant. Most happen in the first 3 months. Losing a pregnancy at any stage can be painful and upsetting, and whatever you feel is valid.",
        },
        {
          heading: "Why it happens",
          body: "Most miscarriages happen because the pregnancy is not developing properly. This is often linked to a genetic problem, such as an extra or missing chromosome. The chance is higher from age 35, when the baby's father is 45 or over, and with some long-term health conditions, such as diabetes that is not well controlled. A miscarriage is usually not caused by anything you did. Most of the time it happens by chance and is no one's fault. Everyday things such as exercise, sex, normal work or an argument do not cause it.",
        },
        {
          heading: "Signs to look out for",
          body: "The main sign is bleeding from the vagina, from light spotting to heavier bleeding. You may also have cramps or pain in your lower tummy or lower back, or notice fluid or tissue coming from your vagina. Bleeding or pain does not always mean a miscarriage. Still, contact a doctor, nurse or midwife straight away if you have any bleeding, fluid leaking from your vagina, or discharge that is unusual for you.",
        },
        {
          heading: "When to get emergency help",
          body: "If you are pregnant or could be, call your local emergency number or go to an emergency department if you have sudden, sharp and very bad tummy pain, pain in the tip of your shoulder, or heavy bleeding that soaks a pad soon after you put it on. Do the same if you have pain or bleeding and also feel very dizzy, faint or sick, or look very pale. These signs can also point to an ectopic pregnancy, which needs urgent treatment.",
        },
        {
          heading: "What happens next",
          body: "A doctor may use blood or urine tests and an internal ultrasound scan to see what is happening. If an early miscarriage is confirmed, there are usually three options. You can wait for the pregnancy to pass on its own, which usually takes about 2 weeks, but can take longer. You can take medicine to help it pass. Or you can have a short procedure, where a thin tube is passed through the vagina into the womb to remove the pregnancy tissue.",
        },
        {
          heading: "Support and the future",
          body: "Grief after a miscarriage is normal, whatever the stage of pregnancy. Support is available, and counselling may help you cope. After a miscarriage, many people later have a healthy pregnancy. If you decide to try again, a doctor can talk you through any risks. If you have had 3 or more miscarriages, ask a doctor about tests to look for a cause.",
        },
      ],
      notice: "This is general information. If you have bleeding or pain in pregnancy, contact a doctor, nurse or midwife. If pain is severe, get emergency help.",
    },
  },
  {
    slug: "ectopic-pregnancy",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Ectopic pregnancy", href: "https://www.nhs.uk/conditions/ectopic-pregnancy/" },
      { label: "MedlinePlus — Ectopic pregnancy", href: "https://medlineplus.gov/ectopicpregnancy.html" },
    ],
    related: ["miscarriage", "early-pregnancy-signs", "pid"],
    en: {
      title: "Ectopic pregnancy",
      summary: "An ectopic pregnancy grows outside the womb and cannot continue. It can become a medical emergency, so it helps to know the warning signs and get help fast.",
      sections: [
        {
          heading: "What an ectopic pregnancy is",
          body: "An ectopic pregnancy is when a fertilised egg implants and starts to grow outside the womb. This most often happens in one of the fallopian tubes, which carry eggs from the ovaries to the womb. In the UK, about 1 in 90 pregnancies is ectopic. Sadly, the pregnancy cannot develop into a baby and cannot be saved. If it keeps growing, the tube can burst and cause serious bleeding inside the body.",
        },
        {
          heading: "Symptoms to know",
          body: "Some people have no symptoms at first, or only the usual signs of pregnancy, such as a missed period, sore breasts or feeling sick. When symptoms do appear, it is usually between the 4th and 12th week of pregnancy. They can include pain low down on one side of your tummy, vaginal bleeding or a brown watery discharge, and discomfort when you pee or poo. If you have any of these and could be pregnant, contact a doctor or nurse the same day.",
        },
        {
          heading: "Get emergency help",
          body: "Call your local emergency number or go to an emergency department if you have sudden, sharp and very bad tummy pain, pain in the tip of your shoulder, or heavy bleeding that soaks a pad soon after you put it on. Do the same if you have pain or bleeding and also feel very dizzy, faint or sick, or look very pale. These can be signs that the tube has burst, which is life-threatening.",
        },
        {
          heading: "Who is more at risk",
          body: "An ectopic pregnancy is more likely if you have had one before, have had pelvic inflammatory disease (PID), or have had surgery on your fallopian tubes. It is also more likely if you got pregnant through fertility treatment such as IVF (where an egg is fertilised in a lab), or while using a copper or hormonal coil (IUD). Smoking and being older, especially over 35, raise the risk too.",
        },
        {
          heading: "Treatment",
          body: "Because the pregnancy cannot continue, it needs to be removed or to end on its own. Sometimes doctors watch closely to see if it ends without treatment. Otherwise, treatment is an injection of a medicine called methotrexate to end the pregnancy, or keyhole surgery (laparoscopy) to remove it. Your care team will explain which option is safest for you.",
        },
        {
          heading: "After an ectopic pregnancy",
          body: "Losing a pregnancy this way can be very hard. Many people feel deep grief, and it is fine to ask for support. Many people who have had an ectopic pregnancy go on to have a healthy pregnancy later. If you get pregnant again, contact a doctor or nurse early and tell them about your past ectopic pregnancy, because it can happen again.",
        },
      ],
      notice: "This is general information. If you could be pregnant and have sudden severe tummy pain, shoulder-tip pain or feel very faint, get emergency help now.",
    },
  },
  {
    slug: "unplanned-pregnancy",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — Pregnancy options", href: "https://www.plannedparenthood.org/learn/pregnancy/pregnancy-options" },
      { label: "Healthdirect — Making decisions about unplanned pregnancies", href: "https://www.healthdirect.gov.au/making-decisions-about-pregnancy" },
      { label: "NHS — Doing a pregnancy test", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/" },
      { label: "NHS inform — Your options if you're pregnant", href: "https://www.nhsinform.scot/healthy-living/womens-health/middle-years-around-25-to-50-years/sexual-health-contraception-and-pregnancy-options/your-options-if-youre-pregnant/" },
    ],
    related: ["pregnancy-tests", "choosing-contraception", "healthy-pregnancy"],
    en: {
      title: "Unplanned pregnancy: your options",
      summary: "If you are pregnant and did not plan to be, you have options. The decision is yours, and a doctor, nurse or clinic can help you think it through.",
      sections: [
        {
          heading: "First, confirm the pregnancy",
          body: "If you think you might be pregnant, a home pregnancy test can tell you from the first day of a missed period. A positive result is almost always correct. The next step is to see a doctor or nurse, or visit a sexual-health or family-planning clinic. They can confirm the pregnancy and help work out how many weeks pregnant you are. This matters because some options depend on how far along the pregnancy is.",
        },
        {
          heading: "Your options",
          body: "There are three main options. You can continue the pregnancy and raise the child, alone or with a partner. You can continue the pregnancy and place the child for adoption, so that another person or family raises them permanently. In some places, the child can also be cared for by foster carers or by relatives (kinship care). Or you can have an abortion, which ends the pregnancy with medicine or a medical procedure.",
        },
        {
          heading: "The decision is yours",
          body: "This choice is personal, and no two situations are the same. You are the best person to decide what is right for you, and no one should pressure you either way. Many people find it helps to talk to someone they trust, such as a partner, friend or family member, but you do not have to. If someone is pressuring you or you do not feel safe, tell a doctor, nurse or clinic. Take the time you need, while keeping in mind that timing can affect which options are open to you.",
        },
        {
          heading: "Where to get advice",
          body: "A doctor, nurse, or a sexual-health or family-planning clinic can give you accurate information about all your options. You can ask them how they keep what you tell them private. Some services only discuss some options, so it can help to choose one that will talk you through all of them without judgement. Laws and services for pregnancy care, adoption and abortion differ from country to country, and sometimes within a country, so local advice matters.",
        },
        {
          heading: "Looking after yourself",
          body: "Whatever you decide, emotional and practical support can help. If you continue the pregnancy, start prenatal care as soon as you can. If you could be pregnant, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of an ectopic pregnancy.",
        },
      ],
      notice: "This is general information, not advice on what to choose. For support, talk to a doctor, nurse or sexual-health or family-planning clinic.",
    },
  },
  {
    slug: "periods-after-birth",
    category: "pregnancy",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Natural family planning", href: "https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/" },
      { label: "CDC — Urgent maternal warning signs", href: "https://www.cdc.gov/hearher/maternal-warning-signs/index.html" },
      { label: "NHS — Your body after the birth", href: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/" },
      { label: "Pregnancy, Birth and Baby — Periods after pregnancy", href: "https://www.pregnancybirthbaby.org.au/womens-health/postnatal-health/periods-after-pregnancy" },
    ],
    related: ["choosing-contraception", "postpartum-depression", "irregular-periods"],
    en: {
      title: "Periods after giving birth",
      summary: "After birth you bleed for a few weeks, but this is not a period. Periods can return within weeks or after many months, depending on how you feed your baby.",
      sections: [
        {
          heading: "Bleeding after birth is not a period",
          body: "After you give birth, you bleed from your vagina for a few weeks. This bleeding (lochia) is heavy and bright red at first, so you will need super-absorbent pads. Over the following weeks it gets lighter, turns brownish and then stops. This is a normal part of recovery and is different from your first period. Use pads, not tampons, until after your check-up about 6 weeks after the birth, because tampons can raise the chance of infection.",
        },
        {
          heading: "When periods come back",
          body: "If you bottle feed, or combine bottle feeding with breastfeeding, your first period could come as soon as 5 to 6 weeks after the birth. If you breastfeed only, your periods may not return for several months, and for some people who keep breastfeeding, not for 1 to 2 years. Your periods may not be the same as before pregnancy, and period pain may feel different. If they have changed and you are worried, talk to a doctor or nurse. Logging your bleeding in Ciclo can help you see when your periods return.",
        },
        {
          heading: "You can get pregnant before your first period",
          body: "You can get pregnant again as early as 3 weeks after the birth, even if you are breastfeeding and your periods have not come back. This is because your body can release an egg before your first period comes back. If you do not want to get pregnant, start contraception within 21 days of the birth. A doctor, nurse or midwife can help you choose a method that suits you, including while breastfeeding.",
        },
        {
          heading: "Breastfeeding as contraception",
          body: "Breastfeeding can help prevent pregnancy, but only under strict conditions. This is called the lactational amenorrhoea method. It only works if all of these are true: your baby is under 6 months old, your periods have not come back, and your baby has only breast milk, with no formula or solid food. You also need to breastfeed at least every 4 hours in the day and every 6 hours at night. With typical use it is 98% effective, meaning about 2 in 100 women get pregnant within 6 months. If any condition changes, you need another method.",
        },
        {
          heading: "Heavy bleeding after birth",
          body: "Get emergency help if your bleeding suddenly gets much heavier or is very heavy, especially if you feel faint or your heart is racing. Contact your midwife or doctor the same day if you soak a pad every 1 to 2 hours, pass large clots, or your bleeding turns bright red again. A check-up is often offered about 6 weeks after the birth.",
        },
        {
          heading: "Other warning signs in the first year",
          body: "In the year after birth, get medical help straight away if you have a fever of 38°C or higher, severe tummy pain that does not go away, chest pain, trouble breathing, or a painful, red or swollen leg. Do the same for a headache that will not go away or gets worse, changes in your vision, or extreme swelling of your hands or face. Say that you gave birth recently. If you have thoughts of harming yourself or your baby, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information. If your bleeding after birth suddenly gets heavier or you feel unwell, contact your midwife or doctor, or get emergency help.",
    },
  },
];
