// Volcker Scenario Intro Briefing — Structured Content Data
// Six sections of historically researched narrative for the Volcker Disinflation scenario (1979–1982)

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.volckerIntro = {
  scenario: 'volcker',
  sections: [

    // =========================================================================
    // SECTION 1: The Phone Call
    // STATUS: Placeholder — content locked in prior session, awaiting paste
    // =========================================================================
    {
      id: 'section-1',
      number: 1,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter One',
      title: 'The phone call',
      deck: 'October 6, 1979. A Saturday.',
      type: 'editorial',
      content: {
        blocks: [
          { type: 'paragraph', text: '<em>[Section 1 content locked in prior design session. Paste the full prose for \u201cThe Phone Call\u201d here.]</em>', isFirst: true },
          { type: 'paragraph', text: 'This section will contain the narrative opening of the Volcker scenario \u2014 the Saturday morning phone call that changed monetary policy forever.' }
        ]
      }
    },

    // =========================================================================
    // SECTION 2: The World You're Inheriting
    // STATUS: COMPLETE
    // =========================================================================
    {
      id: 'section-2',
      number: 2,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Two',
      title: 'The world you\u2019re inheriting',
      deck: 'A decade of fever, and the letters no one wanted to write.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place. Touch any one to go deeper, or read past them to keep moving.',
      content: {
        blocks: [
          {
            type: 'paragraph',
            isFirst: true,
            text: 'In November 1979, a month after Paul Volcker told the nation that the rules had changed, a woman in Chicago who signed herself only as <span class="gateway" data-depth="d-cm">C.M.</span> wrote a letter to a newspaper advice column. Her husband was a maintenance worker. He made about fourteen thousand dollars a year. They had two young children. She had started babysitting other people\u2019s kids for extra money, which caused problems with her own kids, but they needed the money. With rising rents and heat, she wrote, there was nothing left for movies or dances or clothes. \u201cNow it looks like inflation is going to get even worse,\u201d she wrote, \u201cand I just start crying when I think about it.\u201d She wanted to know if her problem was one a psychiatrist could help her with, or if she should just stick it out.'
          },
          {
            type: 'depth',
            id: 'd-cm',
            label: 'In depth \u00b7 C.M., Chicago',
            title: '\u201cI feel I would get over this if I just had more money.\u201d',
            paragraphs: [
              'C.M.\u2019s letter was published on November 8, 1979, in a syndicated column by Dr. Alvin Poussaint, a Harvard psychiatrist better known to later generations as the production consultant who kept <em>The Cosby Show</em> honest about Black family life. In 1979 he was writing a weekly column on mental health, and by late that year a growing share of his mail was about money.',
              'C.M. described feeling \u201csilly\u201d for not being able to cope with inflation. \u201cI know that inflation affects everyone,\u201d she wrote, \u201cand I feel silly sometimes because I feel like I\u2019m being a baby.\u201d The shame is the detail that matters most. She wasn\u2019t angry. She wasn\u2019t blaming anyone. She thought the problem might be her.',
              'Poussaint\u2019s response was careful. \u201cMore people are suffering from tension and depression due to the deteriorating economy than most people realize,\u201d he wrote. \u201cMany individuals complain about rising prices but few feel comfortable admitting that they are developing emotional symptoms as a result of it.\u201d He suggested community involvement and, if the depression persisted, counseling. He did not tell her the problem was her. He told her the problem was real.',
              'By late 1979, advice columns and family counselors across the country were fielding a new kind of mail. The specific humiliation of the decade was that ordinary people had been told by economists and politicians that inflation was structural, unavoidable, something to be adjusted to. Families who couldn\u2019t adjust concluded they were failing personally. C.M. was one of millions. Her letter just happened to get printed.'
            ]
          },
          {
            type: 'paragraph',
            text: 'By the fall of 1979, millions of American families were keeping a version of C.M.\u2019s ledger in their heads. It didn\u2019t require an economics degree. A gallon of gas that cost thirty-six cents in 1972 was pushing a dollar. A loaf of bread that cost a quarter was approaching fifty cents. Ground beef had doubled. A dozen eggs had doubled. A first-class postage stamp had gone from eight cents to fifteen. Every trip to the supermarket confirmed what the government statisticians confirmed a few weeks later on the evening news: the money in your wallet was worth less than it had been the month before, and less than that the month before.'
          },
          {
            type: 'paragraph',
            text: 'The strange part was that it had been going on for so long most people couldn\u2019t remember when it had started. A teenager in 1979 had never known a year of stable prices. A young married couple had never made a household budget that actually held. Economists had a word for what was happening \u2014 <span class="gateway" data-depth="d-stagflation">stagflation</span> \u2014 but the word was new and the condition it named was so contrary to everything the textbooks said that for most of the decade the people who ran the economy had refused to believe it was real.'
          },
          {
            type: 'depth',
            id: 'd-stagflation',
            label: 'In depth \u00b7 Stagflation',
            title: 'The word the textbooks didn\u2019t have.',
            paragraphs: [
              'Through the 1960s, American economists believed \u2014 on the authority of a famous empirical paper by the New Zealand economist A. W. Phillips \u2014 that inflation and unemployment moved in opposite directions. If one went up, the other went down. You could have high employment and stable prices, or you could have a recession and lower prices, but you couldn\u2019t have rising prices and rising unemployment at the same time. The Phillips curve was one of the pillars of postwar macroeconomics, and Washington built its policies on it.',
              'The 1970s demolished the pillar. Unemployment rose. Inflation rose. The curve that wasn\u2019t supposed to exist appeared on every economist\u2019s blackboard, and no one had a theory for it. The <em>Washington Post</em> columnist Joseph Kraft coined the portmanteau <em>stagflation</em> in 1972 to describe it \u2014 stagnation plus inflation \u2014 and the word stuck because there wasn\u2019t a better one. Milton Friedman had been warning since the late 1960s that something like this was possible; his monetarist critique of Keynesian demand management suddenly looked prescient, and a generation of young economists began rebuilding the field around his insights.',
              'But theory is cold comfort when a union contract is indexed to last year\u2019s inflation and this year\u2019s prices are already higher. For ordinary households, stagflation meant your paycheck chased prices that always stayed a step ahead. The psychology of it \u2014 the sense that the ground itself was sliding \u2014 was the hardest part to explain to anyone who hadn\u2019t lived through it.'
            ]
          },
          {
            type: 'paragraph',
            text: 'The fever had started almost a decade earlier, in August 1971, when Richard Nixon closed the gold window and ended the Bretton Woods system that had anchored the dollar since World War II. Nixon imposed wage and price controls at the same time, which worked briefly and then failed spectacularly when they were lifted. Then came the first oil shock, in October 1973, when the Arab members of OPEC embargoed countries that had supported Israel in the Yom Kippur War, and the price of a barrel of crude quadrupled in six months. Gas lines formed. Speed limits dropped to fifty-five. Consumer prices jumped eleven percent in 1974 alone.'
          },
          {
            type: 'paragraph',
            text: 'Gerald Ford tried to fight inflation with <span class="gateway" data-depth="d-win">lapel buttons</span>. Jimmy Carter tried to fight it with sermons. Neither approach worked, and by the summer of 1979 the second oil shock \u2014 triggered by the Iranian Revolution \u2014 had pushed inflation back into double digits and shoved unemployment up alongside it. In July, Carter went on national television and delivered a speech that his staff had titled <em>A Crisis of Confidence</em>. Critics called it the malaise speech, though Carter never used that word. He told the country that it was suffering a spiritual sickness. Then, two days later, he fired his entire cabinet. The small bounce his speech had earned him collapsed overnight. By September his approval rating had touched nineteen percent \u2014 the lowest any American president had ever recorded in a national poll.'
          },
          {
            type: 'depth',
            id: 'd-win',
            label: 'In depth \u00b7 Whip Inflation Now',
            title: 'Lapel buttons against an eleven-percent fever.',
            paragraphs: [
              'In October 1974, two months after taking office, Gerald Ford stood before a joint session of Congress and announced a program to fight inflation. Its centerpiece was a voluntary public campaign called Whip Inflation Now. Americans were asked to wear red-and-white lapel buttons reading WIN, to grow victory gardens, to clean their plates, to carpool, to lower their thermostats, and to make pledges of personal sacrifice against rising prices. Ford distributed twelve million buttons. He wore one himself.',
              'The program was ridiculed almost immediately. Alan Greenspan, then chairman of Ford\u2019s Council of Economic Advisers, later called it \u201cunbelievably stupid.\u201d The economist Herbert Stein said it was \u201cmeasles of the spirit.\u201d Within months the buttons had become a punchline, and by the time Ford left office they were a symbol of a government that had mistaken inflation for a morale problem.',
              'But WIN mattered, even as a failure. It marked the moment American policy gave up on serious anti-inflation measures and tried to substitute civic virtue. The lesson the next generation of policymakers took from WIN was that inflation could not be shamed out of existence. It could only be broken. Whoever did the breaking would be hated for a while.'
            ]
          },
          {
            type: 'paragraph',
            text: 'Six weeks after the malaise speech, Carter nominated Paul Volcker to run the Federal Reserve. Six weeks after <em>that</em>, Volcker flew to Belgrade for the annual meetings of the International Monetary Fund. The keynote lecture that year was delivered by a man named <span class="gateway" data-depth="d-burns">Arthur Burns</span>, who had chaired the Federal Reserve from 1970 to 1978 \u2014 the chairman, in other words, under whose watch most of the decade\u2019s inflation had been generated. Burns\u2019s lecture was titled <em>The Anguish of Central Banking</em>. It was, in effect, a confession.'
          },
          {
            type: 'depth',
            id: 'd-burns',
            label: 'In depth \u00b7 Arthur Burns in Belgrade',
            title: 'The confession that changed the decade.',
            paragraphs: [
              'Arthur Burns was seventy-five years old in September 1979, retired from the Fed for a year, and still the most respected central banker in the Western world. He had been a mentor to a generation of economists, an adviser to Eisenhower, and a trusted confidant of Nixon. And under his chairmanship, from 1970 to 1978, inflation in the United States had climbed from below five percent to above nine \u2014 the largest peacetime increase in American history to that point.',
              'On September 30, 1979, Burns stood before the delegates of the IMF and the World Bank in Belgrade and delivered the annual Per Jacobsson Lecture. He titled it <em>The Anguish of Central Banking</em>. His thesis was that central bankers, despite their training, their traditions, and the powerful tools at their command, had failed utterly to contain inflation in the 1970s, and that this failure was not an accident. It was the structural consequence of democracy. Modern governments had committed themselves to high employment and to a long list of social obligations that required accommodating monetary policy. Central banks that resisted were isolated, pressured, and overruled. Central banks that complied watched inflation rise. Burns saw no way out.',
              '\u201cBy training, if not also by temperament,\u201d Burns told the room, central bankers \u201care inclined to lay great stress on price stability, and their abhorrence of inflation is continually reinforced by contacts with one another and with like-minded members of the private financial community. And yet, despite their antipathy to inflation and the powerful weapons they could wield against it, central bankers have failed so utterly in this mission in recent years. In this paradox lies the anguish of central banking.\u201d',
              'Paul Volcker was in the room. He had flown to Belgrade days earlier and had been meeting privately with European finance ministers who were urging him, in the plainest terms, to do something stern about the dollar. Burns\u2019s lecture was the argument Volcker had come to Belgrade to refute. Burns said central banks could not fight inflation because politics would not let them. Volcker, listening from the audience, disagreed. Six days later he was back in Washington, calling an unscheduled FOMC meeting to prove it.',
              'Neither man acknowledged the other publicly that week. But the decade turned, quietly, in that lecture hall.'
            ]
          },
          {
            type: 'paragraph',
            text: 'Burns told the room that central banks had the theoretical power to stop inflation but not the political will. Volcker, sitting in the audience, disagreed. Six days later he was back in Washington, calling the meeting that would prove him right. What he could not tell C.M. in Chicago, or anyone else, was that breaking the fever would get worse before it got better. Much worse. Interest rates would go up before inflation came down. Unemployment would go up with them. The very people writing letters to advice columns about the grocery bill were the people who would lose their jobs first.'
          },
          {
            type: 'pullquote',
            text: '\u201cMore people are suffering from tension and depression due to the deteriorating economy than most people realize.\u201d',
            attribution: '\u2014 Dr. Alvin Poussaint, syndicated column, November 8, 1979'
          },
          {
            type: 'paragraph',
            text: 'This was the world Paul Volcker inherited, and the world you inherit with him. A decade of accelerating prices. A public that had learned to expect them. A political class that had run out of ideas. A predecessor who had just given a public eulogy for the idea that central banks could even try. And somewhere in Chicago, a woman with two young children who had started crying when she thought about what was coming next, because what was coming next was going to be harder than what she\u2019d already lived through.'
          },
          {
            type: 'paragraph',
            text: 'You\u2019re going to be the one who makes it harder. And then, if you hold your nerve, the one who makes it stop.'
          }
        ]
      }
    },

    // =========================================================================
    // SECTION 3: The Cast
    // STATUS: COMPLETE — verbatim from volcker-section-3.html
    // =========================================================================
    {
      id: 'section-3',
      number: 3,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Three',
      title: 'The cast',
      deck: 'Nineteen at the table. A president who needs help. A country running out of patience.',
      type: 'dossier',
      conventions: 'Tap any card to open it. Voting tags mark who carries a vote at the October 6, 1979 meeting. Hawk and dove tags mark where each Fed member sits on the tightening question.',
      content: {
        intro: 'Every monetary-policy decision in the United States of America runs through a room of nineteen people and a memo from the staff. Seven are the Board of Governors, sitting in Washington. The other twelve are the presidents of the regional Federal Reserve Banks. They have different bosses, different constituencies, different instincts. Below are the people in the room \u2014 and a few more, waiting outside it.',
        groups: [
          {
            header: 'The Board of Governors \u00b7 Washington',
            note: 'Seven seats, all with a vote at every meeting.',
            cards: [
              {
                id: 'volcker',
                name: 'Paul A. Volcker',
                roleInline: 'Chairman \u00b7 age 52',
                tags: [{ label: 'Voting \u00b7 Chair', type: 'vote' }],
                hook: 'Six foot seven, a cheap cigar, and no theoretical allegiance. You.',
                cardClass: 'voting',
                depth: [
                  'Princeton, Harvard, the London School of Economics. Treasury under-secretary under Nixon; the man in the room at Camp David in August 1971 when the gold window closed. President of the New York Fed from 1975 until two months ago. Carter nominated him in July on the advice of his Wall Street donors and against the advice of his political staff, who warned that Volcker was too hawkish to re-elect. Volcker told the President during the interview, in plain language, that he believed the Fed would have to tighten more than Miller had been willing to tighten. Carter nominated him anyway.',
                  'He lives alone in a small apartment in Washington. His wife Barbara stayed behind in New York with their teenage son because she has rheumatoid arthritis, their son has diabetes, and the salary cut from NY Fed president to Fed Chairman meant they could not afford two households on one income unless she kept her bookkeeping job. He takes the shuttle to New York on weekends. He eats cheaply. His suits fit badly.',
                  'He is not a theorist. He reads monetarist literature without converting to it. His discipline is practical: he has spent twenty years in Treasury and Fed positions watching politicians ask central bankers to paper over fiscal problems, and he has decided it will stop. He does not yet know how far he is willing to go. Neither does anyone else.'
                ]
              },
              {
                id: 'schultz',
                name: 'Frederick H. Schultz',
                roleInline: 'Vice Chairman \u00b7 age 50',
                tags: [{ label: 'Voting \u00b7 Vice', type: 'vote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'A Florida politician with no training in monetary economics and a politician\u2019s ear for a room.',
                cardClass: 'voting',
                depth: [
                  'Jacksonville businessman, former Florida state legislator, Democrat. Confirmed in July 1979, eleven days before Volcker. Carter appointed him as a political counterweight \u2014 someone who understood elected officials and could speak plainly to the White House. Schultz has no formal training in monetary economics and has said so in public. What he has instead is a politician\u2019s instinct for reading a room, and he spent his first month at the Board concluding that the Fed was behind the curve. He will back Volcker on the Saturday Night Special without hesitation and will still be backing him two years from now when the farmers arrive on tractors.'
                ]
              },
              {
                id: 'wallich',
                name: 'Henry C. Wallich',
                roleInline: 'Governor \u00b7 age 65',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Born in Berlin in 1914. Lived through Weimar. Has cast more FOMC dissents than any governor in Fed history.',
                cardClass: 'voting',
                depth: [
                  'His father was a prosperous Berlin banker. In 1923, when Henry was nine, the Weimar hyperinflation reduced the family\u2019s holdings to scrap paper in the space of a few months. He watched his father work out what was left on a kitchen table. The Wallichs left Germany in 1933 after the Nazi seizure of power, making their way to Argentina and then to the United States. Henry finished his education at Oberlin and took a doctorate in economics at Harvard.',
                  'He taught at Yale for twenty years, wrote a regular column for Newsweek alongside Milton Friedman and Paul Samuelson, and in 1974 was appointed to the Fed by Richard Nixon. By 1979 he has cast more dissenting votes on the FOMC than any governor in the committee\u2019s history, almost all of them against policy he considered insufficiently hawkish. He argues his positions quietly, in a slight German accent that has never worn off, and he does not raise his voice. He does not have to. Everyone at the table knows what he remembers.',
                  'For Wallich, inflation is not an economic variable. It is a thing that destroys the savings of middle-class families and puts demagogues in office. He has been waiting five years for a chairman who would fight it. He thinks Volcker may be the one.'
                ]
              },
              {
                id: 'coldwell',
                name: 'Philip E. Coldwell',
                roleInline: 'Governor \u00b7 age 57',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Texas banker, Ford appointee, term-limited out in early 1980. The Saturday Night Special may be his last vote that matters.',
                cardClass: 'voting',
                depth: [
                  'Former president of the Dallas Fed, appointed to the Board by Ford in 1974. A dry-land economist by training \u2014 his doctoral work was on agricultural banking in the Southwest. On the hawk\u2013dove spectrum he sits just to Wallich\u2019s right and without Wallich\u2019s European anxieties: Coldwell is against inflation because it is bad banking. He is term-limited and will leave the Board in early 1980, which means the Saturday Night Special may be his last vote of consequence. He wants to cast it.'
                ]
              },
              {
                id: 'partee',
                name: 'J. Charles Partee',
                roleInline: 'Governor \u00b7 age 52',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'The staff economist who became a governor. Will need to be convinced, meeting by meeting.',
                cardClass: 'voting',
                depth: [
                  'A career Fed economist, director of research at the Board for most of the 1970s before his appointment as governor in 1976. Partee knows the models. He worries about unemployment more than Wallich does and about inflation more than Teeters does. In September he dissented against raising the discount rate because he thought the existing tightening had not yet worked through. He is not a dove so much as a skeptic about moving faster than the data justify.'
                ]
              },
              {
                id: 'teeters',
                name: 'Nancy H. Teeters',
                roleInline: 'Governor \u00b7 age 48',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove', type: 'dove' }],
                hook: 'The first woman ever appointed to the Board of Governors. Will dissent against tightening more than anyone.',
                cardClass: 'voting',
                depth: [
                  'Carter put her on the Fed in September 1978 after a career as a Congressional Budget Office economist and a Brookings fellow. She knows the Hill, knows the Humphrey-Hawkins Full Employment Act, and knows exactly whom the unemployment line is going to be filled with if Volcker gets his way. She is the most consistent dove on the committee and will dissent against tightening more often than any other governor in this scenario. She does it without apology and without melodrama. When a man across the table once told her that Henry Wallich had been through hyperinflation, she said she understood, but that she had been through the 1930s. She was four years old when the WPA rolled through her Indiana hometown.'
                ]
              },
              {
                id: 'rice',
                name: 'Emmett J. Rice',
                roleInline: 'Governor \u00b7 age 60',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'Tuskegee Airman, Berkeley PhD, confirmed four months ago. Part of a loose dovish bloc of three.',
                cardClass: 'voting',
                depth: [
                  'Born in South Carolina in 1919, educated at City College of New York, drafted in the Second World War as a member of the Tuskegee Airmen, then a Fulbright fellow at the Reserve Bank of India and a Berkeley PhD. Later an advisor at the Treasury and an executive at the National Bank of Washington. He is measured, careful, and firmly on the dove side of the committee. Partee and Rice and Teeters form a loose bloc of three. When the bloc dissents, it is usually together.'
                ]
              }
            ]
          },
          {
            header: 'The Reserve Bank Presidents \u00b7 Voting',
            note: 'Four regional presidents hold rotating votes through 1979. The New York seat is vacant \u2014 and will stay that way until April 1980.',
            cards: [
              {
                id: 'ny-vacant',
                name: '[vacant]',
                roleInline: 'New York Fed \u00b7 permanent voter',
                tags: [{ label: 'Voting \u00b7 NY', type: 'vote' }],
                hook: 'An empty chair at the biggest Reserve Bank in the system. Volcker wanted the bench clear.',
                cardClass: 'voting',
                depth: [
                  'Volcker held this seat himself until August, when he moved to Washington. The Board of Directors of the New York Fed will not confirm Anthony Solomon until the following April. In the meantime, Thomas Timlen \u2014 the Bank\u2019s First Vice President and career administrator \u2014 attends meetings as the permanent alternate without a vote. The largest Reserve Bank in the system, the one closest to the markets, has no vote at the most consequential FOMC meeting of the decade. This is not quite an accident. Volcker wanted the bench clear.'
                ]
              },
              {
                id: 'black',
                name: 'Robert P. Black',
                roleInline: 'Richmond',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A Friedman-tradition monetarist who has been arguing for tighter money all decade.',
                cardClass: 'voting',
                depth: [
                  'Doctorate from Virginia, president of the Richmond Fed since 1973. Black has been arguing for tighter money and clearer monetary targets all decade. He is enthusiastic about the reserves-targeting framework Volcker is about to propose \u2014 it sounds like monetarism to him, even though Volcker is not quite a monetarist. He will vote yes on the Saturday Night Special with both hands.'
                ]
              },
              {
                id: 'mayo',
                name: 'Robert P. Mayo',
                roleInline: 'Chicago',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Former Nixon OMB director. Will get the first phone calls when tightening bites the industrial Midwest.',
                cardClass: 'voting',
                depth: [
                  'Former director of the Nixon Office of Management and Budget, president of the Chicago Fed since 1970. Mayo is a fiscal conservative by temperament and has been uneasy about inflation since the early 1970s. He is not dramatic about it. He will support tightening without making speeches. Chicago\u2019s district covers the industrial Midwest, which means that when tightening bites, his bank presidents and directors will be the first to tell him about the pain. He will still vote with Volcker.'
                ]
              },
              {
                id: 'kimbrel',
                name: 'Monroe Kimbrel',
                roleInline: 'Atlanta',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Pragmatist', type: 'mod' }],
                hook: 'A Georgia commercial banker. The savings-and-loan damage has already arrived in his district.',
                cardClass: 'voting',
                depth: [
                  'Georgia-born commercial banker who came up through the Southeastern banking trade associations and was made president of the Atlanta Fed in 1971. Pragmatic, regional, more interested in bank supervision than in theoretical monetary policy. He will back Volcker because the alternative \u2014 continued double-digit inflation \u2014 is already visibly damaging the savings and loan institutions in his district. The pain has arrived at his doorstep before the cure.'
                ]
              },
              {
                id: 'willes',
                name: 'Mark H. Willes',
                roleInline: 'Minneapolis \u00b7 age 38',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'The youngest Reserve Bank president in the system. An unabashed monetarist who wants Volcker to go further.',
                cardClass: 'voting',
                depth: [
                  'Appointed at thirty-six, fresh from the University of Pennsylvania\u2019s Wharton School, an unabashed monetarist who believes the Fed should target monetary aggregates and accept whatever volatility in short rates results. He has been arguing this position in public for two years. The new operating framework Volcker will propose on October 6 is, from Willes\u2019s standpoint, an overdue capitulation to the right idea. He will vote yes eagerly and then argue all meeting for going further.'
                ]
              }
            ]
          },
          {
            header: 'The Reserve Bank Presidents \u00b7 Non-Voting',
            note: 'Seven regional presidents attend, participate, and cannot vote. Four of them rotate into voting seats at the first meeting of 1980.',
            cards: [
              {
                id: 'morris',
                name: 'Frank E. Morris',
                roleInline: 'Boston',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'Eleven years at the Boston Fed. Has been worrying aloud about recession risk since summer.',
                cardClass: 'nonvoting',
                depth: [
                  'President of the Boston Fed since 1968 \u2014 one of the longest-serving Reserve Bank presidents at the table. Economist, careful speaker, hawk on inflation but dove on the pace. Morris has been worrying aloud about recession risk since the summer. He will not be a voter until 1980, and by then the first recession will already be underway.'
                ]
              },
              {
                id: 'eastburn',
                name: 'David P. Eastburn',
                roleInline: 'Philadelphia',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'A thoughtful moderate approaching retirement. October is one of his last major meetings.',
                cardClass: 'nonvoting',
                depth: [
                  'President of the Philadelphia Fed since 1970, a thoughtful moderate with dovish leanings and a good ear for what staff economists are actually saying beneath their hedges. Eastburn will retire in early 1980, making October 1979 one of his last major FOMC meetings. He has not been a voter in 1979 and will not become one. What he says in the discussion still matters, because Volcker is counting heads as well as votes.'
                ]
              },
              {
                id: 'winn',
                name: 'Willis J. Winn',
                roleInline: 'Cleveland',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'Former dean of Wharton who came to central banking late.',
                cardClass: 'nonvoting',
                depth: [
                  'Former dean of the Wharton School, president of the Cleveland Fed since 1971. An academic economist by training who came to central banking late. He rotates into a voting seat in 1980.'
                ]
              },
              {
                id: 'roos',
                name: 'Lawrence K. Roos',
                roleInline: 'St. Louis',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Inheritor of St. Louis\u2019s monetarist tradition. Will argue for reserves targeting all year.',
                cardClass: 'nonvoting',
                depth: [
                  'The St. Louis Fed has been the intellectual home of American monetarism since the 1960s under its research department, and Roos \u2014 a former county supervisor and Republican politician from Missouri \u2014 inherited that tradition when he was made president in 1976. He will be one of the most consistent voices in the committee for targeting reserves over rates. He is not a voter in 1979 but rotates into a voting seat in 1980, just in time for the post-recession rebound debate.'
                ]
              },
              {
                id: 'baughman',
                name: 'Ernest T. Baughman',
                roleInline: 'Dallas',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A career Fed economist, plain-spoken, will back Volcker through the worst of it.',
                cardClass: 'nonvoting',
                depth: [
                  'A career Fed economist who moved up through the Chicago Fed\u2019s research department before taking the Dallas presidency in 1975. Hawkish, plain-spoken, and not inclined to theatrical disagreements. He will rotate into a voting seat in 1980 and back Volcker reliably through the worst of the recession.'
                ]
              },
              {
                id: 'guffey',
                name: 'J. Roger Guffey',
                roleInline: 'Kansas City',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'When the tractors reach the Eccles Building in 1981, they will be coming from his district.',
                cardClass: 'nonvoting',
                depth: [
                  'A Fed lawyer turned Reserve Bank president in 1976. His district includes the farm belt, which will become the most politically dangerous part of the country for the Volcker Fed within eighteen months. When the tractors arrive at the Eccles Building in 1981, they will be coming from Guffey\u2019s district. He will still vote with Volcker when his rotation arrives.'
                ]
              },
              {
                id: 'balles',
                name: 'John J. Balles',
                roleInline: 'San Francisco',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'The largest Reserve Bank by geography. A long-time advocate of monetary discipline.',
                cardClass: 'nonvoting',
                depth: [
                  'Economist, former Cleveland Fed researcher, president of the San Francisco Fed since 1972. The largest Reserve Bank by geography, covering nine Western states and a quarter of the country\u2019s GDP. Balles is a hawk and a long-time advocate of monetary discipline. He is not a voter in 1979.'
                ]
              }
            ]
          }
        ],
        pullquote: {
          text: '\u201cNothing could get Henry to admit anything. He had lived through the hyperinflation in Germany. For Henry, you could never get inflation low enough.\u201d',
          attribution: '\u2014 Nancy Teeters on Henry Wallich, oral history, 2008'
        },
        civilianGroups: [
          {
            header: 'The White House',
            cards: [
              {
                id: 'carter',
                name: 'Jimmy Carter',
                roleInline: '39th President \u00b7 age 55',
                tags: [{ label: 'President', type: 'civ' }],
                hook: 'Nineteen percent approval. Appointed Volcker against his political staff\u2019s warnings. May soon wish he hadn\u2019t.',
                cardClass: 'civilian',
                depth: [
                  'Peanut farmer, nuclear engineer, former governor of Georgia, born-again Baptist. Elected in 1976 on a promise of restoring honesty to the White House after Watergate. In July 1979 he gave a televised address his staff called <em>A Crisis of Confidence</em> and then fired his cabinet, which collapsed the speech\u2019s small bounce overnight. By September his Gallup approval was nineteen percent. He appointed Volcker in the same month against the warnings of his political advisors, who told him a Volcker Fed would tighten into the election year and cost him a second term. Carter said he wanted the best man for the job. He has not asked Volcker to soften the tightening. He may soon wish he had.',
                  'Carter faces a primary challenge from the left. The Iranian hostage crisis will begin in two weeks. The Soviets will invade Afghanistan in December. In every direction, something is about to go worse.'
                ]
              },
              {
                id: 'miller',
                name: 'G. William Miller',
                roleInline: 'Treasury Secretary \u00b7 age 54',
                tags: [{ label: 'Treasury', type: 'civ' }],
                hook: 'Your predecessor at the Fed, now across the Federal Triangle. Wrong chair at both jobs.',
                cardClass: 'civilian',
                depth: [
                  'A former Textron executive with no background in monetary economics. Carter appointed him Fed chairman in March 1978 as a business-friendly moderate. His seventeen months at the Fed were widely considered a failure: inflation accelerated, the dollar collapsed, and by the summer of 1979 the markets had lost confidence in the chairmanship itself. In July, Carter moved him to Treasury to get him out of the Fed without firing him, and nominated Volcker to replace him. Miller is now technically Volcker\u2019s counterpart across the Federal Triangle. Their instincts on tightening are opposite. Miller\u2019s instincts are about to matter less than they used to.'
                ]
              },
              {
                id: 'schultze',
                name: 'Charles L. Schultze',
                roleInline: 'CEA Chair \u00b7 age 55',
                tags: [{ label: 'White House', type: 'civ' }],
                hook: 'Brookings Keynesian, skeptical of tightening, about to be ignored.',
                cardClass: 'civilian',
                depth: [
                  'A respected Brookings economist, Johnson-era budget director, and moderate Keynesian who has spent the Carter years trying to square the administration\u2019s inflation rhetoric with its spending commitments. He is skeptical of the kind of tightening Volcker will propose and will say so in cabinet meetings. He will be ignored.'
                ]
              }
            ]
          },
          {
            header: 'The Opposition',
            cards: [
              {
                id: 'kennedy',
                name: 'Edward M. Kennedy',
                roleInline: 'Senator \u00b7 Massachusetts \u00b7 age 47',
                tags: [{ label: 'Primary challenger', type: 'civ' }],
                hook: 'The last Kennedy brother in the Senate, gathering to challenge Carter from the left.',
                cardClass: 'civilian',
                depth: [
                  'Lion of the Democratic left, and in late 1979 the gathering threat to Carter\u2019s renomination. He will formally enter the primary on November 7 \u2014 one month after the Saturday Night Special \u2014 with a Roger Mudd interview that goes so badly it will follow him to the grave. But in October he is still ascendant, still the front-runner in the polls, and his policy platform includes wage and price controls, national health insurance, and explicit opposition to the kind of monetary tightening Volcker is about to unleash. A Kennedy Fed would look nothing like a Volcker Fed. Kennedy will not win the nomination. But the fear that he might is part of what keeps Carter from publicly disowning Volcker when the screaming starts.'
                ]
              },
              {
                id: 'reagan',
                name: 'Ronald Reagan',
                roleInline: 'Former Governor of California \u00b7 age 68',
                tags: [{ label: 'Republican challenger', type: 'civ' }],
                hook: 'Will formally declare November 13. Instinctively hard-money. Will ultimately renominate you.',
                cardClass: 'civilian',
                depth: [
                  'Has been running for president in one form or another since 1968. Will formally declare his 1980 candidacy five weeks after the Saturday Night Special, on a platform of tax cuts, deregulation, and a stronger line against the Soviets. On monetary policy he is instinctively hard-money and will ultimately renominate Volcker in 1983, but in October 1979 his attacks on the Carter economy will sharpen every week. He is not yet the favorite. He will be by spring.'
                ]
              }
            ]
          },
          {
            header: 'Labor',
            cards: [
              {
                id: 'fraser',
                name: 'Douglas A. Fraser',
                roleInline: 'UAW President \u00b7 age 63',
                tags: [{ label: 'Labor', type: 'civ' }],
                hook: 'Scottish-born son of a Detroit electrician. His members will be the first names on the unemployment line.',
                cardClass: 'civilian',
                depth: [
                  'Autoworker at Chrysler\u2019s DeSoto plant from eighteen, climbed the union through the postwar era, elected UAW president in 1977. Fraser\u2019s union has negotiated cost-of-living adjustments into every major auto contract in the country \u2014 the very mechanism that translates last year\u2019s inflation into this year\u2019s wages. When Volcker tightens, the first bodies to hit the unemployment line will be in Fraser\u2019s membership: autoworkers, steelworkers, construction tradesmen, the industrial core of the New Deal coalition. Fraser will not stay silent. He has already resigned, in 1978, from a White House labor-management advisory group with a public letter accusing American business of conducting \u201ca one-sided class war\u201d against working people. He is not about to soften now.'
                ]
              }
            ]
          },
          {
            header: 'The Country',
            cards: [
              {
                id: 'farmers',
                name: 'The farmers',
                roleInline: 'Heartland',
                tags: [{ label: 'Debt-financed', type: 'civ' }],
                hook: 'Leveraged through the 1970s on rising land values. At twenty percent, the interest payments become fatal.',
                cardClass: 'civilian',
                depth: [
                  'American agriculture spent the 1970s on a debt-fueled expansion. Land prices rose. Export demand looked endless. Farmers borrowed against land to buy more land and against equipment to buy more equipment. When short rates move from eleven to twenty and stay there, the interest payments on that debt become immediately fatal. In early 1979 the American Agriculture Movement \u2014 an independent farm group founded in Colorado two years earlier \u2014 had already driven a tractorcade to Washington to protest parity prices. In February 1979 they were back. In early 1981, during the worst of the Volcker tightening, they will come again, circling the Eccles Building itself. You will see them from the seventh-floor window of your office. You will not like what you see.'
                ]
              },
              {
                id: 'builders',
                name: 'Home-builders and car dealers',
                roleInline: 'Main Street',
                tags: [{ label: 'Rate-sensitive', type: 'civ' }],
                hook: 'The canaries. They will mail you two-by-fours and cardboard coffins full of unsold car keys.',
                cardClass: 'civilian',
                depth: [
                  'A mortgage rate of twelve percent makes a house unaffordable. A mortgage rate of seventeen makes a house unsellable. Residential construction will contract violently when the rate shock lands, and home-builders across the country will mail two-by-fours to the Eccles Building with their districts painted on the side. Car dealers, whose customers finance at the same rates, will send the keys of unsold cars in cardboard coffins. The letters from ordinary people \u2014 savers who had been trying to buy a first house, retirees whose municipal bonds were suddenly worth half \u2014 will pile up in the mailroom so thick that the staff will begin a separate log for them.'
                ]
              },
              {
                id: 'wallstreet',
                name: 'Wall Street',
                roleInline: 'NYC',
                tags: [{ label: 'Bond traders \u00b7 gold bugs', type: 'civ' }],
                hook: 'A bond market in crisis and a gold market in mania. They do not yet believe any American central banker will hold the line.',
                cardClass: 'civilian',
                depth: [
                  'In October 1979 Wall Street is a bond market in crisis and a gold market in mania. The ten-year Treasury yields over ten percent and no one believes the yield is high enough to compensate for the inflation risk. Gold has doubled in a year and is approaching $400 an ounce with dealers telling reporters that four hundred was unthinkable a month ago. The men in shirtsleeves at Salomon Brothers and Merrill Lynch have spent the decade watching the Fed accommodate one political pressure after another. They do not yet believe any American central banker will hold the line. On the morning of October 7 they will begin to find out.'
                ]
              }
            ]
          }
        ],
        coda: 'This is who is in the room, and who is at the gate. You are about to walk into a meeting with twelve votes in it, and you need seven of them. You probably have them. Probably.'
      }
    },

    // =========================================================================
    // SECTION 4: The Instrument
    // STATUS: COMPLETE — verbatim from volcker-section-4.html
    // =========================================================================
    {
      id: 'section-4',
      number: 4,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Four',
      title: 'The instrument',
      deck: 'Not a rate hike. A change in the rules of the game itself.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place. Touch any one to go deeper, or read past them to keep moving.',
      content: {
        blocks: [
          // ---- Paragraph 1 (drop cap) ----
          {
            type: 'paragraph',
            isFirst: true,
            text: 'The thing to understand about what happened on October 6, 1979 is that the discount rate hike was the least important part of it. One percentage point \u2014 from eleven to twelve \u2014 was large by the standards of the decade, but the Fed had been raising rates in half-point increments for months and inflation had not flinched. The markets would have shrugged. What made the Saturday Night Special different \u2014 what made Joseph Coyne tell CBS to send a crew \u2014 was the second announcement, the one that changed <span class="gateway" data-depth="d-procedure">how the Federal Reserve conducted monetary policy</span>.'
          },
          // ---- Depth: The operating procedure ----
          {
            type: 'depth',
            id: 'd-procedure',
            label: 'In depth \u00b7 The operating procedure',
            title: 'Targeting reserves instead of rates.',
            paragraphs: [
              'Since the early 1970s, the FOMC had conducted monetary policy by setting a target for the federal funds rate \u2014 the interest rate banks charge each other for overnight loans of reserves. Every six to eight weeks, the committee met, chose a target rate, and directed the Open Market Desk at the New York Fed to buy or sell Treasury securities in whatever amounts were needed to keep the market rate near the target. If the economy overheated, the committee raised the target a quarter or half a point. If the economy softened, they lowered it. The Desk did the plumbing.',
              'The problem was that by 1979 this system had been failing for a decade. Inflation rose faster than the committee was willing to raise rates, which meant that \u201creal\u201d interest rates \u2014 the rate minus inflation \u2014 were often negative. Borrowing was cheap in inflation-adjusted terms even when nominal rates looked high. The committee kept adjusting the thermostat, but the room kept getting hotter because the adjustments were always too slow and too small. Political pressure was part of the reason. The rest was institutional inertia: a quarter point at a time felt responsible, and any single quarter point could always be justified as prudent gradualism.',
              'Volcker\u2019s proposal replaced this system with something that sounded technical but was conceptually radical. Instead of targeting the price of bank reserves (the interest rate), the Fed would target the <em>quantity</em> of reserves \u2014 specifically, the quantity of \u201cnonborrowed\u201d reserves, meaning reserves the Fed supplied through open market operations rather than through the discount window. The committee would set a target path for the monetary aggregates (the total money supply), the staff would calculate how many reserves were consistent with that path, and the Desk would supply that many reserves and no more. The federal funds rate would then be free to go wherever the market pushed it.',
              'In practice, the FOMC still set a permissible range for the funds rate \u2014 but the range was now enormous. The initial range was 11.5 to 15.5 percent, four full points wide. By March 1980 it would widen to 13 to 20 percent. Under the old system, the Desk had kept the rate within a quarter-point band. Under the new system, the rate could swing by hundreds of basis points in a single week. This was the point. If the Fed was no longer deciding what the interest rate should be, no one could blame the Fed for what the interest rate turned out to be. The market would set the price. The Fed would set the quantity. If rates went to twenty percent, that was the market\u2019s judgment about what it took to slow the growth of money.'
            ]
          },
          // ---- Paragraph 2 ----
          {
            type: 'paragraph',
            text: 'Until that Saturday evening, the Federal Reserve had always told the world what it wanted interest rates to be. The Desk at the New York Fed would buy and sell Treasury securities to keep the federal funds rate near its target, and the markets understood that the Fed was setting the price of money. Everyone\u2019s job, from a bond trader in Lower Manhattan to a Chrysler plant manager in Detroit, was to react to the price the Fed had chosen. The new procedure reversed this. The Fed would now set the <em>quantity</em> of bank reserves. The market would discover the price.'
          },
          // ---- Paragraph 3 ----
          {
            type: 'paragraph',
            text: 'This was not a technical adjustment. It was a transfer of blame. Under the old system, if the federal funds rate hit fifteen percent, the FOMC had chosen fifteen percent, and every letter from a home-builder and every protest from a union president was addressed to the people who had made the choice. Under the new system, if the rate hit fifteen or eighteen or twenty, the Fed could say \u2014 truthfully \u2014 that it was targeting the money supply, not the rate. The rate was whatever the market determined it had to be to bring money growth in line with the target. Volcker understood this perfectly. He was not a <span class="gateway" data-depth="d-monetarism">monetarist</span> in theory, but he was willing to use monetarist machinery when the machinery offered something no other framework could give him: political cover for rates that no FOMC in history would have voted to set explicitly.'
          },
          // ---- Depth: The monetarist question ----
          {
            type: 'depth',
            id: 'd-monetarism',
            label: 'In depth \u00b7 The monetarist question',
            title: 'Was Volcker a monetarist?',
            paragraphs: [
              'The short answer is no. The longer answer is that he was happy to let people think so.',
              'Milton Friedman and the monetarist school had been arguing since the late 1960s that the Fed should stop targeting interest rates and instead control the money supply directly. Their theory was that inflation was always and everywhere a monetary phenomenon \u2014 too much money chasing too few goods \u2014 and that the Fed could end it simply by holding the growth of the money supply to a rate consistent with stable prices. The St. Louis Fed, under its research department and president Lawrence Roos, had become the institutional home of this view inside the Federal Reserve System. Robert Black at the Richmond Fed was sympathetic. Mark Willes at Minneapolis was a believer.',
              'Volcker read the literature and was unpersuaded by the doctrine. He doubted that the money supply could be measured precisely enough to target precisely, and he doubted that the relationship between money growth and inflation was as mechanical as Friedman claimed. But he also understood that the monetarist framework solved a problem no other framework could solve. If the Fed announced that it was targeting the money supply rather than interest rates, it could let rates rise as high as the market wanted to push them \u2014 and attribute the resulting pain not to a policy choice but to a mechanical consequence of hitting the monetary target. The committee would not have voted for twenty percent. The market would have taken them there.',
              'Volcker described his own approach, during the October 6 FOMC meeting itself, as \u201csomething of a hybrid.\u201d He was not lying. He was using monetarist vocabulary and monetarist machinery while retaining the pragmatist\u2019s right to override both whenever the data called for it. The true monetarists \u2014 Roos, Willes, Black \u2014 voted yes enthusiastically, believing they had won a doctrinal battle. Volcker let them believe it. He had won something more useful: room to maneuver.'
            ]
          },
          // ---- Paragraph 4 ----
          {
            type: 'paragraph',
            text: 'On the evening of October 6, standing at the podium in the Eccles Building with reporters who had rushed to Washington on short notice, Volcker announced <span class="gateway" data-depth="d-three">three actions</span>. The discount rate would rise one percentage point, to twelve percent \u2014 the headline the evening news would carry. The Board would impose a supplementary reserve requirement on certain bank liabilities that had been fueling speculative lending \u2014 a technical measure aimed at the banks that were funneling hot money into commodities and foreign exchange. And the FOMC would adopt a new operating procedure focused on controlling the supply of bank reserves rather than targeting the federal funds rate \u2014 the structural change that would make everything else possible.'
          },
          // ---- Depth: The three-part announcement ----
          {
            type: 'depth',
            id: 'd-three',
            label: 'In depth \u00b7 The three-part announcement',
            title: 'One headline, two mechanisms.',
            paragraphs: [
              'The discount rate hike \u2014 from 11 percent to 12 percent, approved unanimously by the Board \u2014 was the action the public understood. The evening news led with it. Newspapers ran it at the top of their front pages on Monday morning. It was large by historical standards and it signaled seriousness.',
              'The supplementary reserve requirement was a targeted strike at banks that had been growing their \u201cmanaged liabilities\u201d \u2014 large certificates of deposit, Eurodollar borrowings, and federal funds purchased from non-member institutions \u2014 to fund speculative lending. By imposing an 8 percent marginal reserve requirement on growth in these liabilities above a base level, the Board was taxing exactly the kind of credit expansion that was feeding the gold and foreign exchange frenzy. This action did not get many headlines, but the banks felt it immediately.',
              'The new operating procedure \u2014 targeting nonborrowed reserves rather than the federal funds rate \u2014 was the action that mattered most and was understood least. Most of the reporters in the room that evening had never heard of nonborrowed reserves. Volcker explained it in the plainest terms he could manage and was still met with confused questions. The next morning\u2019s coverage reflected the confusion: the rate hike was reported clearly, the reserves shift was reported as a vague commitment to \u201ctighter control of the money supply.\u201d It would take weeks for the financial press and months for the academic community to work out the implications. By then, the federal funds rate was already moving in ways no one had seen before.'
            ]
          },
          // ---- Pullquote ----
          {
            type: 'pullquote',
            text: '\u201cThat, combined with the constraint on the federal funds rate, brings us to something of a hybrid.\u201d',
            attribution: '\u2014 Paul Volcker, FOMC transcript, October 6, 1979'
          },
          // ---- Paragraph 5 ----
          {
            type: 'paragraph',
            text: 'The reporters in the room that evening understood the rate hike. They did not understand the reserves shift, and Volcker did not go out of his way to make it vivid. The next morning\u2019s papers would lead with \u201cFed Raises Discount Rate\u201d and bury the procedural change below the fold. This suited Volcker. The procedural change was a machine, and machines work best when nobody is staring at them. Its job was to let the funds rate climb as high as the market demanded without anyone at the FOMC having to raise a hand and vote for twenty percent.'
          },
          // ---- Paragraph 6 ----
          {
            type: 'paragraph',
            text: 'There was a fourth thing the Saturday Night Special did, and it had nothing to do with reserves or rates. It was <span class="gateway" data-depth="d-psychology">psychological</span>. An unscheduled meeting, on a Saturday, announced in a press conference on a holiday weekend: the form of the thing was as important as the content. Arthur Burns, six days earlier, had told the world that central banks could not fight inflation because politics would not let them. Volcker\u2019s Saturday meeting was an answer delivered not in words but in scheduling. A Fed chairman who calls an emergency meeting on a weekend is not a Fed chairman who is going to be managed by the White House. The markets understood the message even if they did not yet understand the mechanism. By Monday morning, the message was all that mattered.'
          },
          // ---- Depth: The signal ----
          {
            type: 'depth',
            id: 'd-psychology',
            label: 'In depth \u00b7 The signal',
            title: 'Why a Saturday mattered.',
            paragraphs: [
              'The FOMC had scheduled its next regular meeting for October 16 \u2014 ten days away. Volcker could have waited. The discount rate could have been raised at a Board meeting during the regular workweek. The new operating procedure could have been debated at the regular FOMC meeting and implemented without fanfare. Instead, Volcker flew back from Belgrade early, called the Board and the Reserve Bank presidents to Washington on short notice, convened the meeting on a Saturday morning before the markets opened, and held a press conference at six o\u2019clock in the evening \u2014 the first Saturday evening press conference in Fed history.',
              'This was not accidental. Volcker had spent twenty years watching financial markets react to Federal Reserve communications. He knew that a routine announcement at a routine meeting would produce a routine reaction. He needed the markets to understand that something fundamental had changed \u2014 not just the rate, not just the procedure, but the temperament of the institution. A Saturday meeting said: this is urgent. A press conference said: we are not hiding. The combination said: the Federal Reserve is no longer going to be the institution Arthur Burns described in Belgrade.',
              'Edwin Truman, then director of the Board\u2019s Division of International Finance, later recounted a scene from Belgrade the previous week. Volcker had arrived late to Burns\u2019s lecture, sat on the floor against a wall, picked up a copy of the speech, skimmed it, and tossed it back on the floor. \u201cI\u2019m doing it all wrong,\u201d Volcker muttered, loud enough for Truman to hear. Truman understood what he meant. By Saturday evening, so would the markets.'
            ]
          },
          // ---- Paragraph 7 ----
          {
            type: 'paragraph',
            text: 'In the game you are about to play, you will not manage nonborrowed reserves directly. The simulation abstracts the operating procedure into the decision that matters to the player: how much do you tighten, and how much pain are you willing to cause? But the framework underneath is Volcker\u2019s framework, and it is worth understanding because it explains why the interest rates you set will move in ways no prior game scenario permits. In Live Mode, the player nudges rates in quarter-point increments and watches the economy respond in orderly, familiar ways. In the Volcker scenario, the world is different. You can move rates by a hundred basis points, two hundred, four hundred. The economy does not respond in orderly ways. People lose their jobs in clusters. Industries shut down. And the reason you can push rates that hard, the reason anyone lets you, is that Paul Volcker built a machine that made the market do the pushing while the Fed controlled the supply.'
          },
          // ---- Paragraph 8 (closing) ----
          {
            type: 'paragraph',
            text: 'That machine is what you inherit. Use it carefully. It is the most powerful instrument of peacetime economic policy any democratic government has ever built, and it works by making people suffer before it makes them better off. Volcker understood this. He did it anyway. Whether you hold your nerve as long as he did is the question this scenario is built to answer.'
          }
        ]
      }
    },

    // =========================================================================
    // SECTION 5: The Stakes
    // STATUS: COMPLETE — verbatim from volcker-sections-5-6.html
    // =========================================================================
    {
      id: 'section-5',
      number: 5,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Five',
      title: 'The stakes',
      deck: 'What winning looks like. What losing costs. Why both hurt.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place.',
      content: {
        blocks: [
          // ---- Paragraph 1 (drop cap) ----
          {
            type: 'paragraph',
            isFirst: true,
            text: 'Volcker\u2019s success was not measured in jobs saved or recessions averted. It was measured in a number: the rate at which prices were rising when he was done. By that standard \u2014 and only by that standard \u2014 what he did between October 1979 and the summer of 1982 was the most consequential act of peacetime economic policy in American history. Inflation fell from above twelve percent to below three. It has never returned. Everything else that happened along the way \u2014 the two recessions, the ten percent unemployment, the political fury, the human cost \u2014 was the price of the ticket. Volcker paid it. You will be asked to decide whether to pay it too.'
          },
          // ---- Paragraph 2 ----
          {
            type: 'paragraph',
            text: 'The game defines <span class="gateway" data-depth="d-s5-win">success</span> the way history defined Volcker\u2019s: by whether you break inflation, not by whether you avoid pain. And it defines <span class="gateway" data-depth="d-s5-lose">failure</span> in two ways, because there are two ways to fail at this job \u2014 one for weakness and one for recklessness.'
          },
          // ---- Depth: The win condition ----
          {
            type: 'depth',
            id: 'd-s5-win',
            label: 'In depth \u00b7 The win condition',
            title: 'Break it. Whatever it takes.',
            paragraphs: [
              'You win the Volcker scenario if PCE inflation is below 6 percent at the end of your eighth meeting. That is the threshold. Not two percent, not four \u2014 six. In 1979, getting inflation from twelve to six would have been considered miraculous, and historically that is roughly what Volcker achieved by mid-1982 before continuing to push it lower. Your unemployment rate may be above eight percent. Your approval rating may be in the basement. You may have received two-by-fours in the mail. None of that matters for the win condition. The only question is whether prices are stabilizing.',
              'This is a deliberately uncomfortable standard. The game is asking you to accept that a recession \u2014 a deep, painful, job-destroying recession \u2014 is not a failure state. It is a side effect of the cure. Volcker understood this. He said publicly that \u201csome difficult adjustments may lie ahead,\u201d which was the understatement of the decade. He also said, privately, that the alternative \u2014 years of entrenched double-digit inflation \u2014 would be worse. History has mostly agreed with him, though the families who lived through 1981 and 1982 might have framed the question differently.'
            ]
          },
          // ---- Depth: The lose conditions ----
          {
            type: 'depth',
            id: 'd-s5-lose',
            label: 'In depth \u00b7 The lose conditions',
            title: 'Two roads to failure.',
            paragraphs: [
              'You lose the Volcker scenario in one of two ways. The first is the obvious one: inflation is still above 10 percent at the end of your eighth meeting. You tightened, but not enough, or you tightened and then lost your nerve and eased too soon. The fever is still running. The decade of pain continues, and you are the next Arthur Burns \u2014 the chairman who had the tools and didn\u2019t use them.',
              'The second lose condition is subtler and, in some ways, more dangerous: your credibility falls below 20. Credibility in this game is a composite measure of how much the markets, Congress, and the public believe the Fed will follow through on what it says. If you tighten aggressively but communicate erratically \u2014 or if you tighten and then reverse yourself when the political pressure arrives \u2014 the markets conclude you are bluffing. Once they conclude that, your rate decisions stop working. Expectations de-anchor. The inflation premium in long-term bonds stays elevated no matter what you do, because no one believes you will hold. This is the trap Burns fell into, and it is the trap Volcker spent his entire chairmanship trying to avoid.',
              'In practice, the credibility lose condition means you cannot simply slam rates to twenty percent in meeting one and ease at meeting two. The whipsaw destroys trust. Volcker himself made one dramatic reversal \u2014 the credit-controls episode of spring 1980, when he cut rates sharply after a Carter-imposed credit-control program backfired \u2014 and it nearly cost him the war. He recovered only because he tightened again immediately and stayed tight for eighteen months after that. You may or may not get a similar second chance.'
            ]
          },
          // ---- Condition cards ----
          {
            type: 'conditions',
            cards: [
              { cardType: 'win', header: 'Win condition', title: 'Break the fever', text: 'PCE inflation below 6% at the end of Meeting 8 \u2014 regardless of unemployment, regardless of political cost.' },
              { cardType: 'fail', header: 'Lose condition \u00b7 weakness', title: 'Fail to break it', text: 'PCE inflation above 10% at the end of Meeting 8. You had the tools. You didn\u2019t use them.' },
              { cardType: 'fail', header: 'Lose condition \u00b7 recklessness', title: 'Lose their trust', text: 'Credibility below 20 at any point. The markets stop believing you. Your policy stops working.' }
            ]
          },
          // ---- Paragraph 3 ----
          {
            type: 'paragraph',
            text: 'Between the win and the two ways to lose is a narrow corridor, and it gets narrower every meeting. Tighten too slowly and the fever stays. Tighten too fast and then flinch and the markets write you off. Tighten hard and hold and <span class="gateway" data-depth="d-s5-cost">the human cost</span> mounts in ways that will test whether you can sit in the chairman\u2019s office and read the mail.'
          },
          // ---- Depth: The human cost ----
          {
            type: 'depth',
            id: 'd-s5-cost',
            label: 'In depth \u00b7 The human cost',
            title: 'What the numbers don\u2019t say.',
            paragraphs: [
              'Unemployment in this scenario is not an abstraction. Every percentage point of unemployment above six percent represents, roughly, a million American workers who had jobs and lost them. When unemployment hits ten percent \u2014 as it did historically in late 1982 \u2014 that is four million people beyond the baseline who are out of work. They are autoworkers in Flint, Michigan. They are construction workers in Phoenix who framed houses last year and are not framing houses this year. They are the young couples who were about to buy their first home and now cannot qualify for a mortgage. They are the small-business owners whose lines of credit were pulled when the prime rate hit twenty-one and a half percent.',
              'You will not see their faces in the simulation. You will see their numbers on the DECIDE screen \u2014 a line moving upward, a percentage getting worse. The game does not ask you to feel guilty about this. It asks you to decide whether the alternative is worse. That is the question Volcker lived with for three years. He concluded that ten percent unemployment for eighteen months was better than eight percent inflation for ten years. You may or may not agree. But you have to choose.'
            ]
          },
          // ---- Pullquote ----
          {
            type: 'pullquote',
            text: '\u201cSome difficult adjustments may lie ahead.\u201d',
            attribution: '\u2014 Paul Volcker, ABC News interview, October 1979'
          },
          // ---- Paragraph 4 (closing) ----
          {
            type: 'paragraph',
            text: 'There is one more thing to understand about the stakes, and it is the thing that makes the Volcker scenario different from every other scenario in this game. In the other scenarios \u2014 the financial crisis, the pandemic, the soft landing \u2014 the question is whether you respond correctly to events. The economy breaks and you try to fix it. In the Volcker scenario, <em>you</em> are the one who breaks the economy. Deliberately. On purpose. Because you believe that breaking it now is better than letting the fever kill it slowly. The tractors at the gate are there because of you. The letters in the mailroom are addressed to you. The unemployment rate is your doing. The only defense you have is that you were right \u2014 and you won\u2019t know whether you were right until the end.'
          }
        ]
      }
    },

    // =========================================================================
    // SECTION 6: The Morning After Tomorrow
    // STATUS: COMPLETE
    // =========================================================================
    {
      id: 'section-6',
      number: 6,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Six',
      title: 'The morning after tomorrow',
      deck: 'Starting conditions \u00b7 October 6, 1979',
      type: 'data-panel',
      content: {
        conditions: [
          { label: 'Fed Funds Rate', value: '11.50%', accent: true },
          { label: 'PCE Inflation', value: '12.2%', accent: true },
          { label: 'Core CPI', value: '11.8%', accent: false },
          { label: 'Unemployment', value: '6.0%', accent: false },
          { label: 'GDP Growth', value: '1.0%', accent: false },
          { label: 'S&P 500', value: '107', accent: false },
          { label: '10Y Treasury', value: '10.5%', accent: false },
          { label: '2Y Treasury', value: '11.8%', accent: false },
          { label: 'Gold', value: '$395/oz', accent: false },
          { label: 'Credibility', value: '40 / 100', accent: true }
        ],
        meetings: [
          { number: 1, date: 'October 6, 1979', note: 'Saturday. Unscheduled. The one that changes everything.' },
          { number: 2, date: 'January 9, 1980', note: 'First regular meeting of the new year. Voting rotation changes.' },
          { number: 3, date: 'March 18, 1980', note: 'Carter\u2019s credit controls land. Rates near 20%.' },
          { number: 4, date: 'May 20, 1980', note: 'Recession arrives. Credit controls backfire. The first test of nerve.' },
          { number: 5, date: 'August 12, 1980', note: 'Brief recession ends. Inflation rebounds. Back to tightening.' },
          { number: 6, date: 'November 18, 1980', note: 'Reagan wins. Unemployment rising above 7%.' },
          { number: 7, date: 'February 3, 1981', note: 'Deep recession. Rates near 20% again. The tractors are coming.' },
          { number: 8, date: 'May 18, 1981', note: 'Final meeting. Is the fever breaking?' }
        ],
        codaParagraphs: [
          'After each of your eight meetings, the game will show you what the real Paul Volcker decided at the same juncture \u2014 his rate move, his statement, the market\u2019s reaction. You will see your path and his path side by side on the same chart. At the end, the game will compare your inflation, your unemployment, and your credibility to his. He won. The question is whether you win the same way, or a different way, or not at all.',
          'You do not have a dot plot. It did not exist until 2012. You do not have quantitative easing. It was not invented until 2008. You do not hold press conferences after FOMC meetings. That practice began in 2011. Your tools are the ones Volcker had: the federal funds rate, the discount rate, and a statement released through the press office. <em>That is all.</em>'
        ],
        finalLine: 'You are Paul Volcker, and the morning after tomorrow, the markets open.'
      }
    }
  ]
};
