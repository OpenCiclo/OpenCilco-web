// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const CONDITIONS_ARTICLES: LearnArticle[] = [
  {
    slug: "pcos",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Polyendocrine metabolic ovarian syndrome (PMOS)", href: "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/" },
      { label: "Office on Women's Health — Polycystic ovary syndrome", href: "https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome" },
    ],
    related: ["irregular-periods", "infertility", "hormonal-acne"],
    en: {
      title: "PCOS (now also called PMOS)",
      summary: "PCOS is a common hormone condition that can cause irregular periods, acne and extra hair growth. Its symptoms can be managed, and many people with PCOS can still get pregnant.",
      sections: [
        {
          heading: "What PCOS is",
          body: "Polycystic ovary syndrome (PCOS) is a common condition linked to an imbalance of hormones. The NHS in the UK now calls it polyendocrine metabolic ovarian syndrome (PMOS), so you may see either name. It affects about 1 in 10 women of childbearing age. It can start at any age after puberty, but most people find out they have it in their 20s or 30s. The cause is not known, but problems with how the body uses insulin and testosterone seem to play a part. It is more likely if a close relative has it or if you are from an Asian background.",
        },
        {
          heading: "Common signs",
          body: "Many people have irregular periods, with long gaps between them, or miss periods. Higher levels of male-type hormones (androgens), such as testosterone, can cause extra hair on the face, chin or body (hirsutism). They can also cause thinning hair on the head, oily skin and acne. Some people gain weight easily or find it hard to lose weight. Others notice thick, dark patches of skin on the neck, armpits or groin, feel very tired, or have low mood or anxiety.",
        },
        {
          heading: "How it is diagnosed",
          body: "A doctor will ask about your periods and symptoms and may examine you. Blood tests can check your hormone levels and insulin resistance, which is when your body does not respond well to insulin. An ultrasound scan can look at your ovaries. Once other causes have been ruled out, PCOS is usually diagnosed if you have at least two of these three: irregular periods, signs or blood test results showing high androgens, and many small cysts on one or both ovaries. This means you can have PCOS without cysts.",
        },
        {
          heading: "Long-term health",
          body: "PCOS is linked to a higher risk of type 2 diabetes, high blood pressure, unhealthy cholesterol and heart disease. The US Office on Women's Health says more than half of women with PCOS develop diabetes or prediabetes before age 40. There is also a higher risk of cancer of the womb (uterus), fatty liver disease, and sleep apnoea, where breathing stops and starts during sleep. Knowing the risks helps you and your doctor watch for them.",
        },
        {
          heading: "Treatment and what helps",
          body: "Treatment aims to ease the symptoms that bother you most. A balanced diet and regular exercise help many people. If you are overweight, losing about a tenth of your body weight can make periods more regular and improve the chance of pregnancy. Hormonal contraception, such as the combined pill, can help with irregular periods. Other medicines can reduce extra hair or acne, and metformin, a diabetes medicine, is sometimes used. PCOS is a common cause of fertility problems, but it is treatable. Fertility medicines such as clomifene, or a small operation on the ovaries, can help.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your cycles are often shorter than 24 days or longer than 38 days. Also see one if you have had no period for 3 months and are not pregnant or breastfeeding. Get checked too if extra hair or acne bothers you, if you are struggling to get pregnant, or if you feel low. Logging your periods in Ciclo for a few months can help you show your doctor how long your cycles are.",
        },
      ],
      notice: "This is general information, not a diagnosis. Only a doctor can diagnose PCOS, so talk to one if your periods are irregular or you are worried.",
    },
  },
  {
    slug: "endometriosis",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "WHO — Endometriosis", href: "https://www.who.int/news-room/fact-sheets/detail/endometriosis" },
      { label: "NHS — Endometriosis", href: "https://www.nhs.uk/conditions/endometriosis/" },
    ],
    related: ["period-pain", "adenomyosis", "painful-sex"],
    en: {
      title: "Endometriosis",
      summary: "Endometriosis is a common long-term condition that can cause severe period pain. It often takes years to diagnose, so knowing the signs helps you get the right care.",
      sections: [
        {
          heading: "What endometriosis is",
          body: "Endometriosis is a condition where tissue similar to the lining of the womb (uterus) grows outside the womb. This tissue causes swelling (inflammation) and scar tissue. The World Health Organization (WHO) estimates that it affects about 10% of women of reproductive age worldwide, around 190 million people. It can start any time from the first period until menopause, and anyone who has or had a womb can get it. The cause is not known.",
        },
        {
          heading: "Common symptoms",
          body: "The main symptom is pain. This can be severe period pain that stops you doing your normal activities, or pelvic pain that carries on outside your period. Other signs include heavy periods, pain during or after sex, pain when you poo or pee, bloating, feeling sick and extreme tiredness. Some people find it hard to get pregnant. Endometriosis can also affect your mental health, including depression and anxiety.",
        },
        {
          heading: "Why diagnosis can take years",
          body: "Endometriosis can be hard to diagnose. WHO says the average time to diagnosis is between 4 and 12 years. A doctor will ask about your periods, pain and bleeding, and may examine you. You may have an ultrasound or MRI scan. A keyhole operation (laparoscopy), with a thin camera put in through a small cut, can confirm it. But you do not always need an operation before you start treatment. Logging your bleeding, cramps and other symptoms in Ciclo for a few cycles can help you describe clearly what is happening.",
        },
        {
          heading: "Treatments that can help",
          body: "There is no cure, but treatment can ease pain and other symptoms. Anti-inflammatory painkillers (NSAIDs) such as ibuprofen can ease pain. Hormone treatments can also help. These include the combined pill, patch or ring, progestogen options such as the hormonal IUD (coil) or the injection, and medicines called GnRH analogues. Surgery can remove patches of endometriosis and scar tissue. Talk with your doctor about which option suits you, including whether you want to get pregnant in the future.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you think you might have endometriosis, or if your symptoms affect your daily life, work or relationships. This includes period pain that painkillers do not help, pain that stops you going to school or work, and pain during sex. It can help to bring a record of your symptoms and say clearly how they affect you. Get emergency help if you have sudden, severe pelvic pain, or severe pain on one side and you could be pregnant.",
        },
      ],
      notice: "This is general information, not a diagnosis. If period pain stops you doing everyday things, talk to a doctor or nurse.",
    },
  },
  {
    slug: "adenomyosis",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Adenomyosis", href: "https://www.nhs.uk/conditions/adenomyosis/" },
      { label: "Mayo Clinic — Adenomyosis: symptoms and causes", href: "https://www.mayoclinic.org/diseases-conditions/adenomyosis/symptoms-causes/syc-20369138" },
      { label: "Mayo Clinic — Endometrial ablation", href: "https://www.mayoclinic.org/tests-procedures/endometrial-ablation/about/pac-20393932" },
    ],
    related: ["heavy-periods", "endometriosis", "fibroids"],
    en: {
      title: "Adenomyosis",
      summary: "Adenomyosis is when the lining of the womb grows into its muscle wall. It can cause heavy, painful periods, and there are treatments that help.",
      sections: [
        {
          heading: "What adenomyosis is",
          body: "In adenomyosis, tissue from the womb lining (endometrium) grows into the muscle layer of the womb (uterus). This can make the womb bigger, which can make the lower tummy feel sore or heavy. It is not the same as endometriosis, where tissue like the womb lining grows outside the womb. The cause is not clear. It is most often diagnosed in women over 30, and it is more likely if you are over 30 and have given birth. But it can affect anyone who has periods. Past surgery on the womb, such as a caesarean section, is also linked to it.",
        },
        {
          heading: "Symptoms",
          body: "Some people have no symptoms, or only mild discomfort. When there are symptoms, the most common are heavy periods and painful periods. The pain can be severe enough to stop your usual activities. Some people also have pelvic pain that does not go away between periods, pain during sex, or a bloated, heavy or full feeling in the tummy. Very heavy bleeding can lower your iron and lead to anaemia (too few healthy red blood cells), which can make you tired and short of breath.",
        },
        {
          heading: "Getting a diagnosis",
          body: "If you have symptoms, a doctor will ask about your periods and may examine you. An ultrasound scan or an MRI scan can help show adenomyosis. Logging your bleeding and cramps in Ciclo for a few cycles can help you show a doctor how heavy and painful your periods are.",
        },
        {
          heading: "Treatments that can help",
          body: "Anti-inflammatory painkillers (NSAIDs) can ease pain, and a medicine called tranexamic acid can reduce heavy bleeding. Hormonal treatments can also help. These include the hormonal IUD (coil), the progestogen-only pill, the combined pill and the contraceptive patch. Surgery is another option. This can mean removing the lining of the womb (endometrial ablation) or removing the womb itself (hysterectomy). After a hysterectomy you cannot get pregnant. Ablation is not advised if you want a pregnancy in the future, and you still need contraception after it. Talk with your doctor about your plans first. Symptoms often go away after menopause.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your periods are heavy or long, or if period pain gets in the way of daily life. Also get checked if you have pelvic pain between periods, pain during sex, bleeding between periods or after sex, or bloating that lasts about 3 weeks. Get an urgent appointment if your pain is severe or worse than usual and painkillers have not helped. Get emergency help if you have very heavy bleeding with dizziness or fainting, or sudden, severe pelvic pain.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods are very heavy or painful, talk to a doctor or nurse.",
    },
  },
  {
    slug: "fibroids",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Fibroids", href: "https://www.nhs.uk/conditions/fibroids/" },
      { label: "Office on Women's Health — Uterine fibroids", href: "https://www.womenshealth.gov/a-z-topics/uterine-fibroids" },
    ],
    related: ["heavy-periods", "anemia", "adenomyosis"],
    en: {
      title: "Fibroids",
      summary: "Fibroids are common growths in or around the womb that are almost never cancer. Many cause no symptoms, but some lead to heavy or painful periods.",
      sections: [
        {
          heading: "What fibroids are",
          body: "Fibroids are growths made of muscle that develop in or around the womb (uterus). They are almost always non-cancerous: fewer than 1 in 1,000 is cancer. They can be as small as a seed or as big as a grapefruit, and you can have one or several. Fibroids are very common. Estimates suggest that 20% to 80% of women develop them by age 50. They mainly affect people who have not reached menopause, and they usually shrink afterwards.",
        },
        {
          heading: "Who is more likely to get them",
          body: "Fibroids are most common in women in their 40s and early 50s. You are more likely to get them if your mother or another close relative had them. They are also more common in Black women and women from an Asian background. Being overweight is linked to a higher chance of fibroids too. Anyone with a womb can get them.",
        },
        {
          heading: "Symptoms",
          body: "Many people with fibroids have no symptoms and do not know they have them. When fibroids do cause symptoms, these can include heavy or painful periods, tummy pain, lower back pain, and a feeling of fullness or swelling in the lower tummy. Some people need to pee more often or suddenly, or have trouble pooing. Others have pain or discomfort during sex. Heavy bleeding over time can lower your iron and lead to anaemia (too few healthy red blood cells).",
        },
        {
          heading: "Tests and medicines",
          body: "A doctor may examine you and arrange an ultrasound scan. The scan shows the number, size and position of any fibroids. If fibroids are not causing symptoms, you may not need any treatment. For heavy or painful periods, painkillers such as ibuprofen or naproxen can help. Other options are a medicine called tranexamic acid, or hormonal medicines such as the combined pill or the hormonal IUD (coil).",
        },
        {
          heading: "Surgery and other procedures",
          body: "Other options can shrink or remove fibroids. These include an operation to remove only the fibroids (myomectomy), a procedure that blocks the blood supply to the fibroids (uterine artery embolisation), and an operation to remove the womb (hysterectomy). Some of these treatments mean you cannot get pregnant afterwards, and others can make a later pregnancy riskier. If you may want children in the future, talk with your doctor about this before choosing a treatment.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you have heavy or painful periods, pain in your tummy or lower back, a frequent need to pee, or pain during sex. Heavy periods include changing a pad or tampon every 1 to 2 hours, or passing clots larger than about 2.5 cm. Tracking your bleeding in Ciclo can help you describe how heavy your periods are. Bleeding after menopause should always be checked by a doctor. Get emergency help if you have very heavy bleeding with dizziness or fainting, or sudden, severe pain in your tummy or pelvis.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods are heavy or you have pelvic pain, talk to a doctor or nurse.",
    },
  },
  {
    slug: "ovarian-cysts",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Ovarian cyst", href: "https://www.nhs.uk/conditions/ovarian-cyst/" },
      { label: "Office on Women's Health — Ovarian cysts", href: "https://www.womenshealth.gov/a-z-topics/ovarian-cysts" },
      { label: "MedlinePlus — Ovarian cysts", href: "https://medlineplus.gov/ovariancysts.html" },
    ],
    related: ["pcos", "endometriosis", "ectopic-pregnancy"],
    en: {
      title: "Ovarian cysts",
      summary: "Ovarian cysts are fluid-filled sacs on an ovary. Most are harmless and go away on their own, but a few need treatment and some signs need urgent help.",
      sections: [
        {
          heading: "What ovarian cysts are",
          body: "An ovarian cyst is a sac filled with fluid that forms in or on an ovary. They are very common, and most women have one at some point. The most common kind, called functional cysts, form as part of the menstrual cycle. Each month an egg grows inside a small sac (follicle). A cyst can form if the follicle does not open to release the egg, or if the sac does not shrink afterwards. These cysts are usually harmless and go away within a few months.",
        },
        {
          heading: "Other types of cyst",
          body: "Less often, cysts form because cells grow in an unusual way. These are called pathological cysts. Some cysts are linked to conditions such as endometriosis. Most cysts are not cancer, but the risk of a cyst being cancer is higher after menopause. Polycystic ovary syndrome (PCOS, now also called PMOS) is a different condition. People with PCOS can have many small cysts, along with irregular periods and high levels of hormones such as testosterone.",
        },
        {
          heading: "Symptoms",
          body: "Most ovarian cysts are small and cause no symptoms. You may only find out about one during an internal (pelvic) examination or a scan. A cyst usually causes symptoms only if it is very large, bursts (ruptures) or twists, which can block the blood supply to the ovary. Symptoms can include pelvic pain on the side of the cyst, a feeling of pressure, bloating or a swollen tummy, needing to pee often, pain during sex, and changes to your periods.",
        },
        {
          heading: "Tests and treatment",
          body: "An ultrasound scan can show the size of a cyst and what it looks like, and you may have blood tests. Many cysts need no treatment. Your doctor may suggest waiting and having repeat scans to check whether the cyst has gone. Hormonal contraception that stops ovulation can help prevent new cysts. You may need an operation if the cyst is painful, stays for a long time, or you have been through menopause. This may be done through small cuts in the tummy (laparoscopy).",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if you have symptoms such as pelvic pain, bloating, pain during sex or changes to your periods. Get emergency help straight away if you have sudden, severe pain in your tummy or pelvis. Also get emergency help if you have pain with a fever or vomiting, feel faint, dizzy or weak, or are breathing fast. These can be signs that a cyst has burst or twisted. If you could be pregnant, severe pain on one side needs emergency help too, as it can be a sign of an ectopic pregnancy.",
        },
      ],
      notice: "This is general information, not a diagnosis. Sudden, severe pelvic pain always needs urgent medical help.",
    },
  },
  {
    slug: "anemia",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Iron deficiency anaemia", href: "https://www.nhs.uk/conditions/iron-deficiency-anaemia/" },
      { label: "NHLBI — Iron-deficiency anemia", href: "https://www.nhlbi.nih.gov/health/anemia/iron-deficiency-anemia" },
      { label: "NHS — Ferrous sulfate: how and when to take it", href: "https://www.nhs.uk/medicines/ferrous-sulfate/how-and-when-to-take-ferrous-sulfate/" },
    ],
    related: ["iron-rich-eating", "heavy-periods", "bleeding-disorders"],
    en: {
      title: "Iron deficiency anaemia",
      summary: "Heavy periods are one of the most common causes of low iron. Learn the signs of iron deficiency anaemia, how it is tested and how it is treated.",
      sections: [
        {
          heading: "What it is",
          body: "Your body uses iron to make haemoglobin, the part of red blood cells that carries oxygen around your body. If you do not have enough iron, you cannot make enough healthy red blood cells. This is called iron deficiency anaemia. It is the most common type of anaemia. It is often caused by losing blood, or by pregnancy.",
        },
        {
          heading: "How periods can lower your iron",
          body: "Losing a lot of blood with your period each month is one of the main reasons, because you lose iron with the blood. Other causes include bleeding in the stomach or bowel, for example from an ulcer or from taking aspirin or other anti-inflammatory painkillers (NSAIDs) regularly. A doctor will look for the cause, especially if your periods are not heavy, because hidden bleeding in the gut sometimes needs tests. Some conditions, such as coeliac disease or Crohn's disease, make it harder for your body to absorb iron. Not getting enough iron from food can also play a part, especially in pregnancy.",
        },
        {
          heading: "Signs to look out for",
          body: "Common signs are tiredness and lack of energy, shortness of breath, a heartbeat you can feel (palpitations), paler skin than usual, and headaches. Some people feel dizzy or have cold hands and feet. Less common signs include hair loss, a sore tongue, itchy skin, ringing in the ears, and restless legs. Some people want to eat things that are not food, such as ice or paper (pica).",
        },
        {
          heading: "Tests",
          body: "A doctor or nurse will usually arrange a blood test called a full blood count. This shows whether your red blood cells and haemoglobin are low. Other blood tests can check how much iron is in your blood and how much your body has stored (ferritin). Tell the doctor if your periods are heavy. Logging your bleeding in Ciclo can help you show how heavy your periods are.",
        },
        {
          heading: "Treatment",
          body: "Iron tablets are the usual treatment. Take them as your doctor, nurse or pharmacist advises, and keep them out of sight and reach of children, because too much iron can be fatal for a child. It often takes 3 to 6 months to refill your iron stores. Drinking orange juice after a tablet may help your body absorb the iron. Try not to have tea, coffee, milk or other dairy foods around the same time. Side effects can include constipation or diarrhoea, tummy pain, heartburn, feeling sick and darker poo. Taking tablets with or soon after food may help. Sometimes iron is given through a drip into a vein, or a blood transfusion is needed.",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if you think you might have anaemia, especially if your periods are heavy. Heavy means changing a pad or tampon every 1 to 2 hours, using two products at once, or periods lasting more than 7 days. If heavy periods are the cause, ask about treatment for them too. Get emergency help if you have chest pain, feel very short of breath, or have very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you think your iron is low, see a doctor or nurse for a blood test.",
    },
  },
  {
    slug: "thyroid-and-periods",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Thyroid disease", href: "https://www.womenshealth.gov/a-z-topics/thyroid-disease" },
      { label: "NHS — Underactive thyroid (hypothyroidism)", href: "https://www.nhs.uk/conditions/underactive-thyroid-hypothyroidism/" },
      { label: "NHS — Overactive thyroid (hyperthyroidism)", href: "https://www.nhs.uk/conditions/overactive-thyroid-hyperthyroidism/" },
    ],
    related: ["irregular-periods", "heavy-periods", "early-menopause"],
    en: {
      title: "Thyroid problems and your cycle",
      summary: "Your thyroid helps control how your body uses energy, and it affects your periods too. Too much or too little thyroid hormone can make periods lighter, heavier or irregular.",
      sections: [
        {
          heading: "What the thyroid does",
          body: "The thyroid is a small, butterfly-shaped gland at the front of your neck. It makes hormones that control your metabolism, which includes how fast your body uses energy and how fast your heart beats. Thyroid problems are common in women: about 1 in 8 women will have one during their life. An underactive thyroid (hypothyroidism) makes too little hormone. An overactive thyroid (hyperthyroidism) makes too much.",
        },
        {
          heading: "How it can change your periods",
          body: "Thyroid hormone levels that are too high or too low can change your periods. They may become much lighter, much heavier or irregular. An underactive thyroid can cause irregular or heavy periods. Thyroid problems can also make periods stop for several months or longer (amenorrhoea). When your cycle is affected, ovulation (the release of an egg) is affected too, so it can be harder to get pregnant. Thyroid disease is also linked to the ovaries stopping working before age 40 (premature ovarian insufficiency).",
        },
        {
          heading: "Signs of an underactive thyroid",
          body: "Symptoms usually come on slowly and get worse over time. They can include feeling very tired, feeling cold when others do not, weight gain, constipation, low mood, dry skin, dry or thinning hair, a hoarse voice and trouble concentrating. In the United States, the most common cause is a condition called Hashimoto's disease. It is most common in women and usually starts between the ages of 30 and 50.",
        },
        {
          heading: "Signs of an overactive thyroid",
          body: "An overactive thyroid is about 10 times more common in women than men, and it usually starts between ages 20 and 40. Signs include feeling nervous, anxious or irritable, trouble sleeping and a fast or irregular heartbeat. You may also have shaking hands, sweat more, find heat hard to cope with, feel tired, or lose weight even when you eat as much as usual. Some people have a swelling in the neck. The most common cause is Graves' disease, where the immune system makes the thyroid produce too much hormone.",
        },
        {
          heading: "Tests and treatment",
          body: "A blood test can show how well your thyroid is working. It measures thyroid-stimulating hormone (TSH) and sometimes thyroid hormone (T4). An underactive thyroid is usually treated with tablets that replace the missing hormone. Most people take them for life, with regular blood tests to check the dose. An overactive thyroid can be treated with medicines that stop the thyroid making too much hormone, with radioiodine treatment (a type of radiotherapy), or with surgery to remove some or all of the thyroid.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your periods change, for example becoming much heavier, lighter or irregular, especially if you also have other signs of a thyroid problem. Also get checked if you have had no period for 3 months and are not pregnant or breastfeeding, or if you are finding it hard to get pregnant. If you have a thyroid condition and are pregnant or planning a pregnancy, tell your care team, as thyroid problems in pregnancy can affect you and your baby. Tracking your periods and symptoms in Ciclo can help show what has changed. If you have an overactive thyroid and your symptoms suddenly get much worse, get emergency help, as this can be a rare but life-threatening flare-up.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods change and you also feel unwell, ask a doctor or nurse about a thyroid blood test.",
    },
  },
  {
    slug: "bleeding-disorders",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — Signs and symptoms of bleeding disorders in women", href: "https://www.cdc.gov/female-blood-disorders/signs-symptoms/index.html" },
      { label: "CDC — About von Willebrand disease", href: "https://www.cdc.gov/von-willebrand/about/index.html" },
      { label: "CDC — Bleeding disorders in women", href: "https://www.cdc.gov/ncbddd/blooddisorders/women/index.html" },
    ],
    related: ["heavy-periods", "anemia", "when-to-see-a-doctor"],
    en: {
      title: "Bleeding disorders",
      summary: "Very heavy periods are sometimes caused by blood that does not clot as well as it should. Knowing the signs of a bleeding disorder can help you get tested and treated.",
      sections: [
        {
          heading: "What a bleeding disorder is",
          body: "When you bleed, your blood forms a clot to stop the bleeding. In a bleeding disorder, this does not work as well as it should, so bleeding can be heavier or last longer. The most common bleeding disorder in women is von Willebrand disease. In this condition, the body does not have enough of a protein that helps blood clot, or the protein does not work properly. It is almost always passed down from a parent. It affects men and women equally, but women often notice it because of heavy periods or heavy bleeding after childbirth. Other types include problems with platelets, the tiny blood cells that help form clots.",
        },
        {
          heading: "How common it is",
          body: "In the United States, as many as 1 in 100 women may have a bleeding disorder, and many do not know they have one. Most people with von Willebrand disease have the mildest type. Because so many people are unaware, it is worth knowing the signs, especially if your periods are heavy.",
        },
        {
          heading: "Signs in your periods",
          body: "Heavy periods are a key sign. Your bleeding may be too heavy if your period lasts longer than 7 days. It may also be too heavy if you soak through a pad or tampon every 1 to 2 hours on your heaviest days, pass clots larger than about 2.5 cm, or have flooding that limits what you can do. Having been told you are low in iron, or having had treatment for anaemia, is another clue. Heavy bleeding after giving birth can also be a sign.",
        },
        {
          heading: "Other signs to watch for",
          body: "Look out for nosebleeds that start for no clear reason and last longer than 10 minutes, and bruising easily without an injury. Heavy bleeding after dental work, surgery or another medical procedure is another sign. So is bleeding into muscles or joints without an injury. Having a family member with a bleeding disorder, such as von Willebrand disease or haemophilia, also matters.",
        },
        {
          heading: "Tests and treatment",
          body: "A doctor will ask about your own and your family's history of bleeding, and can order blood tests that measure how well your blood clots. Bleeding disorders cannot be cured, but treatment can keep bleeding under control and prevent problems. For von Willebrand disease, options include a medicine called desmopressin, medicines that slow down the breakdown of clots, such as tranexamic acid, replacement of the missing clotting protein, and the contraceptive pill to make periods lighter. Some painkillers can affect clotting, so ask a doctor or pharmacist which ones are safe for you.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Talk to a doctor or nurse if you have one or more of these signs. Logging how heavy your periods are and how long they last in Ciclo can help you describe your bleeding. If you know you have a bleeding disorder, tell your care team before surgery, dental work or giving birth. Get emergency help if you have very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods are very heavy or you bruise or bleed easily, talk to a doctor or nurse.",
    },
  },
  {
    slug: "pid",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Pelvic inflammatory disease", href: "https://www.nhs.uk/conditions/pelvic-inflammatory-disease-pid/" },
      { label: "CDC — About pelvic inflammatory disease", href: "https://www.cdc.gov/pid/about/index.html" },
    ],
    related: ["stis", "ectopic-pregnancy", "condoms"],
    en: {
      title: "Pelvic inflammatory disease (PID)",
      summary: "PID is an infection of the womb, fallopian tubes or ovaries, usually caused by an STI. It can be mild or cause no symptoms, but quick treatment helps protect your fertility.",
      sections: [
        {
          heading: "What PID is",
          body: "Pelvic inflammatory disease (PID) is an infection of the womb (uterus), the fallopian tubes (the tubes that carry eggs from the ovaries to the womb) or the ovaries. It is usually caused by sexually transmitted infections (STIs), such as chlamydia and gonorrhoea. It can also be caused by bacteria that normally live in the vagina. You are more likely to get PID if you have an untreated STI, have had PID before, have more than one sexual partner, or are 25 or younger. It can also follow giving birth, a miscarriage, or a procedure that opens the neck of the womb (cervix), such as having an IUD (coil) fitted.",
        },
        {
          heading: "Symptoms can be mild or missing",
          body: "PID can be mild, and some people have no symptoms at all, so you may not know you have it. When there are symptoms, they can include pain in your lower tummy or pelvis, pain deep inside during sex, and bleeding between periods or after sex. Periods may be heavier or more painful than usual for you. You may notice vaginal discharge that looks or smells different. Some people get a fever or a burning feeling when they pee.",
        },
        {
          heading: "Why quick treatment matters",
          body: "PID can leave scar tissue inside and around the fallopian tubes, which can block them. This can make it harder to get pregnant. It also raises the risk of an ectopic pregnancy, where a pregnancy grows outside the womb. PID can also cause long-term pelvic pain. Antibiotics can clear the infection. Treating it early lowers the chance of lasting damage, but treatment cannot repair damage that has already happened. That is why it is worth getting checked quickly, even if your symptoms are mild.",
        },
        {
          heading: "Tests and treatment",
          body: "A doctor, nurse or sexual health clinic will ask about your symptoms and examine you. They will usually take swabs from your vagina and cervix, and may do a pregnancy test, blood test or scan. The main treatment is antibiotics, usually an injection and then tablets for 2 weeks. Finish the whole course. Recent sexual partners need to be tested and treated too. Avoid sex until you and your partners have finished all the antibiotics, your symptoms have gone, and tests show the infection has cleared.",
        },
        {
          heading: "When to get help",
          body: "Get an urgent appointment with a doctor, nurse or sexual health clinic if you think you have PID or have pelvic pain that comes and goes. Also get one if you have symptoms and are or might be pregnant, or do not feel better after 3 days of antibiotics. Get emergency help if you have severe or sudden sharp pain in your lower tummy or pelvis, pain in your shoulder or ribs, a high temperature, vomiting, dizziness, heavy vaginal bleeding, or feel very unwell. If you could be pregnant and have severe pain on one side, get emergency help, as this can be a sign of an ectopic pregnancy. Using condoms every time you have sex lowers your risk of the STIs that cause PID.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you have pelvic pain or think you may have an STI, get checked by a doctor, nurse or sexual health clinic.",
    },
  },
  {
    slug: "cycle-and-chronic-conditions",
    category: "conditions",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Your menstrual cycle and your health", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle-and-your-health" },
      { label: "Epilepsy Action — Periods and catamenial epilepsy", href: "https://www.epilepsy.org.uk/info/seizure-triggers/periods-and-the-menstrual-cycle" },
      { label: "Asthma + Lung UK — Female hormones and asthma", href: "https://www.asthmaandlung.org.uk/conditions/asthma/asthma-triggers/female-sex-hormones-and-asthma" },
      { label: "NHS — Asthma attack", href: "https://www.nhs.uk/conditions/asthma/asthma-attack/" },
      { label: "NHS — Epilepsy", href: "https://www.nhs.uk/conditions/epilepsy/" },
    ],
    related: ["menstrual-migraine", "tracking-for-doctor", "pmdd"],
    en: {
      title: "How your cycle can affect other conditions",
      summary: "Hormone changes across your cycle can make some long-term conditions, such as asthma, epilepsy or migraine, worse at certain times. Tracking can help you spot a pattern.",
      sections: [
        {
          heading: "Why your cycle can matter",
          body: "Levels of the hormones oestrogen and progesterone rise and fall across your menstrual cycle. These changes affect more than your womb. If you have a long-term health condition, your symptoms may get worse at certain points in your cycle, often in the days just before your period. This can happen with asthma, epilepsy, diabetes, migraine, irritable bowel syndrome (IBS) and depression. Not everyone with these conditions notices a link.",
        },
        {
          heading: "Asthma",
          body: "Some people find their asthma symptoms get worse before or during their period. Changing hormone levels may make the airways more swollen (inflamed). If you think this happens to you, keep a diary of your asthma symptoms alongside your periods and talk to your doctor or asthma nurse. Use any preventer inhaler every day, as your doctor or nurse advised. Get emergency help if an asthma attack gets worse, your reliever inhaler does not help as your plan says it should, or you do not have your inhaler with you.",
        },
        {
          heading: "Epilepsy",
          body: "For some people with epilepsy, seizures happen more often at certain times in the cycle. This is called catamenial epilepsy, and some research suggests it may affect about 4 in 10 women with epilepsy, though figures differ between studies. Seizures may increase in the days before and during a period, around ovulation, or in the second half of the cycle. Keeping a diary of your cycle and seizures for 3 months can help you see a pattern. If you see one, talk to your epilepsy specialist. They may suggest extra medicine on the days you are most at risk. Call for emergency help if a seizure lasts more than 5 minutes or longer than usual, or one seizure follows another without recovery in between.",
        },
        {
          heading: "Diabetes, migraine, IBS and mood",
          body: "If you have diabetes, your blood sugar (glucose) may be harder to control in the second half of your cycle. Migraine, IBS and depression can all get worse right before a period starts. People with depression are also more likely to have premenstrual syndrome (PMS) or premenstrual dysphoric disorder (PMDD), a more severe form. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
        {
          heading: "How tracking helps your care team",
          body: "A record of your cycle alongside your symptoms is a good way to see a pattern. Logging your period, symptoms, mood and notes in Ciclo for a few months can help you show your doctor or nurse when symptoms flare. Talk to your care team about anything that is new or different. Do not change or stop any medicine without advice. If symptoms become severe, follow your emergency plan or get emergency help.",
        },
      ],
      notice: "This is general information, not medical advice for your condition. Talk to your care team before changing any treatment.",
    },
  },
];
