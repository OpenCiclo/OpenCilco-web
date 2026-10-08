// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const INTIMATE_HEALTH_ARTICLES: LearnArticle[] = [
  {
    slug: "vaginal-discharge",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Vaginal discharge", href: "https://www.nhs.uk/conditions/vaginal-discharge/" },
      { label: "NHS — Bacterial vaginosis", href: "https://www.nhs.uk/conditions/bacterial-vaginosis/" },
      { label: "Office on Women's Health — Douching", href: "https://www.womenshealth.gov/a-z-topics/douching" },
      { label: "WHO — Sexually transmitted infections (STIs)", href: "https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)" },
    ],
    related: ["cervical-mucus", "yeast-infection", "bacterial-vaginosis"],
    en: {
      title: "Vaginal discharge: what's normal",
      summary: "Discharge is a normal, healthy fluid that keeps your vagina clean and moist. Here is what usual discharge looks like and which changes are worth getting checked.",
      sections: [
        {
          heading: "What discharge is for",
          body: "Vaginal discharge is a fluid or mucus that comes out of your vagina. Having it is normal and healthy. It helps keep the vagina healthy, moist and clean, and it helps stop infections. The amount and the look of discharge can change from day to day. Getting to know what is usual for you makes it easier to spot a change that needs checking.",
        },
        {
          heading: "What healthy discharge looks like",
          body: "Healthy discharge is clear or white. At some times it is thick and sticky, and at other times it is slippery and wet. It should not smell strong or bad. Around the time you ovulate (release an egg), discharge is often clearer and wetter, and you may notice more of it. These changes come from cervical mucus, which has its own article about fertility signs.",
        },
        {
          heading: "Why the amount changes",
          body: "The amount of discharge varies between people and over time. You will usually have more when you are pregnant, when you are sexually active, or when you use contraception. This on its own is not a sign that anything is wrong. Logging discharge in Ciclo can help you learn your usual pattern, so a change is easier to notice and describe.",
        },
        {
          heading: "Changes that can mean an infection",
          body: "Some changes point to a common infection. Discharge with a fishy smell can be a sign of bacterial vaginosis (BV). Thick, white discharge that looks like cottage cheese is typical of thrush. Green, yellow or frothy discharge can be a sign of trichomoniasis, a sexually transmitted infection (STI). Discharge with pelvic pain or bleeding can come with chlamydia or gonorrhoea. Discharge with blisters or sores can be a sign of genital herpes. All of these can be treated.",
        },
        {
          heading: "Looking after yourself",
          body: "Your vagina cleans itself, so there is no need to wash inside it. Washing inside the vagina (douching) can upset its natural balance of bacteria. Gently wash the skin around the vagina with warm water and a mild, unperfumed soap. Avoid perfumed soaps and gels, deodorants and scented wipes. Perfumed products in or around the vagina are linked to BV.",
        },
        {
          heading: "When to get checked",
          body: "See a doctor, nurse or sexual health clinic if your discharge changes colour, smell or texture, or if you have itching, soreness or pain. Bleeding between periods or after sex should always be checked. Do not wait if discharge comes with pain in your lower tummy. Untreated chlamydia and gonorrhoea can lead to pelvic inflammatory disease (PID) and fertility problems. Get urgent medical help if you have sudden, severe pain in your lower tummy, or tummy pain with a high temperature, being sick or feeling very unwell.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your discharge changes or you have itching, pain or unusual bleeding, talk to a doctor or nurse.",
    },
  },
  {
    slug: "yeast-infection",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Thrush in men and women", href: "https://www.nhs.uk/conditions/thrush-in-men-and-women/" },
      { label: "CDC — Vaginal candidiasis", href: "https://www.cdc.gov/fungal/diseases/candidiasis/genital/index.html" },
    ],
    related: ["vaginal-discharge", "bacterial-vaginosis", "intimate-hygiene"],
    en: {
      title: "Thrush (yeast infection)",
      summary: "Thrush is a common yeast infection that causes itching and thick white discharge. It is not classed as an STI, and antifungal treatment usually clears it within 1 to 2 weeks.",
      sections: [
        {
          heading: "What thrush is",
          body: "Thrush is caused by candida, a yeast. Yeasts are a kind of fungus. Candida is normally harmless. It grows best in warm, moist places, and thrush can develop when the natural balance in the vagina changes. Thrush is common. After bacterial vaginosis (BV), it is one of the most common vaginal infections. It is not classed as a sexually transmitted infection (STI), but sex can trigger it and, less often, pass it on.",
        },
        {
          heading: "Signs of thrush",
          body: "The most typical sign is white discharge that looks like cottage cheese and does not usually smell. You may also have itching and irritation around the vulva and vagina, and soreness or stinging during sex or when you pee. A fishy smell points more to BV, and green, yellow or frothy discharge can be a sign of an STI. These need different treatment, so it helps to be sure what you have.",
        },
        {
          heading: "What makes thrush more likely",
          body: "Thrush is more likely if you are taking antibiotics or have taken them recently. It is also more common during pregnancy, and in people who use hormonal contraception or hormone replacement therapy (HRT). Diabetes that is not well controlled raises the chance, and so does a weak immune system, for example from HIV or cancer treatment (chemotherapy). Skin around the vulva that is irritated or damaged can also make thrush easier to start.",
        },
        {
          heading: "How it is treated",
          body: "Thrush is treated with antifungal medicine. This can be a tablet you swallow, such as fluconazole, a tablet you put into your vagina (pessary), or a cream to ease irritation on the skin. Symptoms usually go within 1 to 2 weeks of starting treatment. If a doctor has diagnosed thrush in the past and you recognise the signs, you can buy treatment from a pharmacy. Ask the pharmacist which option suits you. If you are pregnant or breastfeeding, see a doctor or nurse before using any thrush treatment.",
        },
        {
          heading: "Helping to prevent thrush",
          body: "Wash the area with water and a plain moisturising cream (emollient) instead of soap or shower gel, and dry well afterwards. Wear cotton underwear, and avoid tight underwear or tights. Do not use douches or deodorants on your vulva or in your vagina. If thrush keeps coming back, a note of when it happens can help a doctor or nurse look for a pattern.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you have signs of thrush for the first time. Also see one if you are under 16 or over 60, or pregnant or breastfeeding. Get checked too if treatment has not worked, if thrush keeps coming back (more than 4 times in 12 months), or if you have a weakened immune system. A doctor or nurse may take a small sample of discharge to check the cause and can suggest other treatment if needed.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you have thrush symptoms for the first time, or they keep coming back, see a doctor or nurse.",
    },
  },
  {
    slug: "bacterial-vaginosis",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Bacterial vaginosis", href: "https://www.nhs.uk/conditions/bacterial-vaginosis/" },
      { label: "CDC — About bacterial vaginosis (BV)", href: "https://www.cdc.gov/bacterial-vaginosis/about/index.html" },
      { label: "NHS — Vaginal discharge", href: "https://www.nhs.uk/conditions/vaginal-discharge/" },
    ],
    related: ["vaginal-discharge", "yeast-infection", "intimate-hygiene"],
    en: {
      title: "Bacterial vaginosis (BV)",
      summary: "BV is a common change in the balance of bacteria in the vagina. It can cause thin, fishy-smelling discharge, and it is treated with antibiotics.",
      sections: [
        {
          heading: "What BV is",
          body: "Bacterial vaginosis (BV) happens when the natural balance of bacteria in the vagina changes and some kinds grow too much. It is the most common vaginal condition in women aged 15 to 44, and a common cause of unusual discharge. BV is not classed as a sexually transmitted infection (STI). Sex can trigger it or pass it on, but people who have never had sex can get it too.",
        },
        {
          heading: "Signs of BV",
          body: "The main sign is discharge with a strong fishy smell, which is often stronger after sex. The discharge may also change colour and texture, becoming thin, watery and greyish-white. Some people have itching, pain or burning in or around the vagina, or burning when they pee. About half of women with BV have no symptoms at all.",
        },
        {
          heading: "What raises the chance of BV",
          body: "Doctors do not fully understand how sex is linked to BV. BV is more common if you are sexually active, have a new partner or more than one partner, or have sex without condoms. Washing inside the vagina (douching), using perfumed products in or around the vagina, and having an IUD (coil) are also linked to BV. Not smoking may help lower your chance of getting it.",
        },
        {
          heading: "Treatment and why it matters",
          body: "BV is treated with antibiotics. These can be tablets, or a gel or cream. If your partner has a vagina, they may need treatment too. Treating BV matters because it is linked to a higher chance of getting HIV and other STIs. During pregnancy there is a small chance that BV can lead to problems such as an early (premature) birth or miscarriage.",
        },
        {
          heading: "Stopping it coming back",
          body: "BV often comes back, usually within a few months. To lower the chance, wash your genital area with water and plain soap, and have showers rather than baths. Avoid perfumed soap, bubble bath, shower gel and antiseptic liquids in the bath. Do not use vaginal washes, deodorants or douches, and avoid strong detergents for your underwear. Using a condom every time you have sex can also help.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor, nurse or sexual health clinic if you think you have BV, and tell them if you are pregnant. Go back if it keeps returning (more than 4 times in a year), as other treatment may help. Get checked too if your discharge is green, yellow or frothy, or comes with pelvic pain or bleeding. These can be signs of an STI that needs different treatment.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you notice unusual discharge or a fishy smell, see a doctor, nurse or sexual health clinic.",
    },
  },
  {
    slug: "uti",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Urinary tract infections (UTIs)", href: "https://www.nhs.uk/conditions/urinary-tract-infections-utis/" },
      { label: "NHS — Kidney infection", href: "https://www.nhs.uk/conditions/kidney-infection/" },
      { label: "MedlinePlus — Urinary tract infections", href: "https://medlineplus.gov/urinarytractinfections.html" },
    ],
    related: ["intimate-hygiene", "stis", "pelvic-floor"],
    en: {
      title: "Urinary tract infections (UTIs)",
      summary: "A UTI can make it burn when you pee and make you need to go more often. Most clear up with antibiotics, but some signs mean you should get help the same day.",
      sections: [
        {
          heading: "What a UTI is",
          body: "Your urinary tract includes your kidneys and your bladder. It also includes the tubes that carry pee to the bladder and the tube that carries pee out of your body (urethra). A urinary tract infection (UTI) can affect any of these parts. An infection of the bladder is called cystitis. About four times as many women get UTIs as men. Diabetes, or needing a tube to drain the bladder (catheter), also raises the risk.",
        },
        {
          heading: "Common symptoms",
          body: "Signs of a UTI include pain or burning when you pee, needing to pee more often than usual, and needing to go suddenly or urgently. Your pee may look cloudy, smell bad or have blood in it. You may feel pain or pressure in your lower tummy. Some people also feel tired or shaky. In older people, a UTI can sometimes cause confusion or agitation.",
        },
        {
          heading: "Signs of a kidney infection",
          body: "A bladder infection can sometimes spread to the kidneys, which is more serious. Signs include a high temperature, feeling hot and cold or shivery, pain in your back or side just under the ribs, and feeling or being sick. A kidney infection needs treatment quickly. If it is not treated, it can lead to sepsis, a serious reaction to infection.",
        },
        {
          heading: "Treatment and self-care",
          body: "A doctor or nurse can check for a UTI with a urine test. Treatment is usually a short course of antibiotics. Take all of the medicine, even if you start to feel better. In some places, a pharmacist can also assess and treat a UTI. While you recover, rest and drink enough to keep your pee pale. Paracetamol can ease pain. Fruit juice, coffee and alcohol may irritate your bladder, so you might want to avoid them for a while.",
        },
        {
          heading: "Lowering your chances",
          body: "Drink plenty of fluids, especially water. Wipe from front to back after using the toilet. Pee as soon as you can after sex, and do not hold your pee in when you need to go. Wearing cotton underwear may also help. If UTIs keep coming back, a doctor or nurse can talk with you about why and what else might help.",
        },
        {
          heading: "When to get help",
          body: "Get help the same day if your symptoms get worse quickly or have not improved after 2 days, or if you are pregnant or aged 65 or over. Also get help the same day if there is blood in your pee, or you have a high temperature, shivers, or pain in your back or side. See a doctor or nurse if you keep getting UTIs (2 in 6 months, or 3 in 12 months). Get emergency help if someone with a UTI becomes confused, very drowsy or has trouble speaking.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you have a high temperature, back or side pain, or blood in your pee, or you are pregnant, get help the same day.",
    },
  },
  {
    slug: "intimate-hygiene",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Douching", href: "https://www.womenshealth.gov/a-z-topics/douching" },
      { label: "NHS — Vaginal discharge", href: "https://www.nhs.uk/conditions/vaginal-discharge/" },
      { label: "NHS — Bacterial vaginosis", href: "https://www.nhs.uk/conditions/bacterial-vaginosis/" },
      { label: "NHS — Thrush in men and women", href: "https://www.nhs.uk/conditions/thrush-in-men-and-women/" },
    ],
    related: ["vaginal-discharge", "bacterial-vaginosis", "yeast-infection"],
    en: {
      title: "Caring for your vulva and vagina",
      summary: "Your vagina cleans itself and needs very little help. Gentle washing of the outside is enough, and douching and scented products can do more harm than good.",
      sections: [
        {
          heading: "Your vagina cleans itself",
          body: "The vulva is the outer part of your genitals. The vagina is the passage inside. The vagina keeps itself clean by making mucus, which comes out as discharge. A healthy vagina has a balance of good and harmful bacteria. This balance keeps the vagina acidic, which helps protect it from infection. Because of this, the inside of the vagina does not need washing.",
        },
        {
          heading: "How to wash",
          body: "Washing the outside, the vulva, with warm water when you bathe or shower is enough. You can use a mild, unperfumed soap. If you get thrush, a plain moisturising cream (emollient) instead of soap may be kinder to your skin. Wash gently and dry the area well afterwards. If you often get bacterial vaginosis (BV), showers may be better for you than baths.",
        },
        {
          heading: "Why douching is a bad idea",
          body: "Douching means washing out the inside of the vagina with water or other liquids. Doctors advise against it. It is linked to BV, pelvic inflammatory disease (PID), STIs and problems in pregnancy, including premature birth and ectopic pregnancy. Women who douche once a week are about five times more likely to get BV than women who do not. Douching does not prevent pregnancy or STIs, and it can make getting an STI more likely.",
        },
        {
          heading: "Products to avoid",
          body: "Perfumed soaps, shower gels and bubble bath can upset the balance in and around the vagina, and so can antiseptic liquids in the bath. It is best to avoid vaginal washes, deodorants and scented wipes, as well as scented pads, tampons, powders and sprays. Use a mild detergent for your underwear. Cotton underwear, and avoiding tight underwear or tights, can help prevent thrush.",
        },
        {
          heading: "Discharge and smell",
          body: "Some discharge is normal and does not need to be washed away. Healthy discharge is clear or white and does not have a strong or unpleasant smell. A strong fishy smell, or a change in the colour or texture of discharge, can be a sign of an infection such as BV or thrush. These are common and treatable, so it is worth getting them checked rather than trying to cover them up.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your discharge smells bad or changes colour or texture, or if you have itching, burning, redness, swelling or soreness around your vulva or vagina. Also get checked if you notice sores or blisters, or bleeding between periods or after sex. These are often signs of a common infection that can be treated. Do not try to treat them by douching or with scented products, as this can make things worse.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you notice itching, soreness or a change in discharge or smell, talk to a doctor or nurse.",
    },
  },
  {
    slug: "pelvic-floor",
    category: "intimate-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — How to help a weak bladder", href: "https://www.nhs.uk/conditions/urinary-incontinence/10-ways-to-stop-leaks/" },
      { label: "MedlinePlus — Kegel exercises: self-care", href: "https://medlineplus.gov/ency/patientinstructions/000141.htm" },
    ],
    related: ["periods-after-birth", "painful-sex", "menopause-symptoms"],
    en: {
      title: "Your pelvic floor",
      summary: "Your pelvic floor muscles support your bladder, womb and bowel. Regular exercises can make them stronger and help with leaks.",
      sections: [
        {
          heading: "What the pelvic floor does",
          body: "The pelvic floor is a group of muscles under your womb (uterus), bladder and bowel. These muscles support those organs and help you control when you pee, poo and pass wind. To find them, imagine you are trying to stop yourself peeing and holding in wind at the same time. The muscles you squeeze to do this are your pelvic floor.",
        },
        {
          heading: "Why it can weaken",
          body: "Pelvic floor muscles can weaken after pregnancy and childbirth, as you get older, if you gain weight, and after some types of gynaecological surgery. Straining to poo when you are constipated weakens them too. A long-term cough, for example from smoking, also puts strain on them. When the muscles are weak, you may leak pee or find it harder to control wind or poo.",
        },
        {
          heading: "How to do pelvic floor exercises",
          body: "Squeeze your pelvic floor muscles, as if holding in pee and wind. Hold the squeeze for a few seconds, then relax for a few seconds. Repeat this 10 times, and aim to do a set 3 times a day. Over time, build up until you can hold each squeeze for 10 seconds. Breathe normally while you do them. Try not to tighten your tummy, thighs, buttocks or chest.",
        },
        {
          heading: "Getting it right",
          body: "Once you know how to do the exercises, do not do them while you are peeing, apart from an occasional check that you are using the right muscles. It takes time to see a change. Some people have fewer leaks after 4 to 6 weeks, but it can take a few months. If you are not sure you are doing them correctly, a doctor or nurse can help.",
        },
        {
          heading: "Other ways to help a weak bladder",
          body: "Some everyday habits can also help. Aim to drink 6 to 8 glasses of fluid a day. Cut down on caffeine, which irritates the bladder and can make leaks worse. Alcohol makes you pee more often, so cutting down may help too. Try to avoid constipation, because straining to poo weakens the pelvic floor. If you smoke, stopping can ease the strain that coughing puts on these muscles.",
        },
        {
          heading: "When to get help",
          body: "Talk to a doctor or nurse if you leak pee or poo, if you are not sure you are finding the right muscles, or if exercises have not helped after a few months. Leaks and weak muscles can often be helped, so there is no need to feel embarrassed about asking. A doctor or nurse can check what is going on and suggest other treatment.",
        },
      ],
      notice: "This is general information. If you have leaks, or you are not sure how to do pelvic floor exercises, talk to a doctor or nurse.",
    },
  },
];
