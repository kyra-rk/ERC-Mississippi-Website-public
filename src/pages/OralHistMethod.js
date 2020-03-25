/**
 * Program file for the Oral History Method Page
 * Made a const and exported it as "OralHistMethod" to reference in App.js
 */
import React from 'react';
import {Row} from 'react-bootstrap'
import codingpic1 from '../pictures/coding1.PNG'
import codingpic2 from '../pictures/coding2.PNG'


export const OralHistMethod = () => (
	  <div>
	    <h1>Oral Histories Methodology</h1>
		<p>The purpose of collecting oral histories and supplemental qualitative research is to provide context to the quantitative measures of economic insecurity that have been developed for this project. Experts at MLICCI and the Empirical Reasoning Center at Barnard College, along with undergraduate students in the Mississippi Semester course at Barnard College, debated the importance of including and excluding a number of indicators. Ultimately, it became clear through conversations with local stakeholders and initial focus groups in Mississippi that further historical and social context would be critical in shaping the index and providing a foundation for interpretation. In this case, the most effective manner by which to dive deeply into social/historical/political contexts was through qualitative approaches.
</p>
	<p>Staff at the Barnard ERC and MLICCI worked with undergraduate students in the Mississippi Semester course to iteratively develop a semi-structured interview script to guide the collection of oral histories from local low income women affected by deep-rooted structural inequalities. The students were trained in interviewing techniques and how to conduct oral histories by Dr. Amy Starecheski, Director of the Oral History Master’s Program at Columbia University. They received further training on recording and using video equipment to film the oral histories through Barnard College’s Instructional Media and Technology Services department. Staff at MLICCI recruited participants for the qualitative study in Biloxi, Mississippi through Moore Community House’s Women in Construction pre-apprenticeship job training program (WinC), which is specifically aimed at helping low income mothers gain additional skills to re-enter or enter the labor force and earn a self-sufficiency wage. MLICCI is affiliated with Moore Community House.</p>
	
	<p>Over the Spring Break trip for the Mississippi Semester, the students, along with ERC Staff and Professor Premilla Nadasen, conducted oral histories and interviews of 15 WinC participants. Prior to the beginning of any interviews, each participant was guided through a comprehensive consent form (see below in appendix). Participants were given several options including an option to release their names and transcripts to the public on this site. Participants were also reminded and informed that they can withdraw their consent at any time, even after their transcript is published, and it will then be removed from the site in that case. Several participants did not consent to releasing their transcripts to the public via this site, and are thus excluded.
</p>

<p>Following the collection of the interview data, the students conducted cursory analyses of the transcripts in order to determine high level themes that emerged within and across the interviews. Although the sample for the qualitative study is small and not necessarily representative of the varied experiences of low income mothers across Mississippi, the analysis of the interviews corroborate the additional interviews and focus groups that have been conducted over the past couple of years since 2018. In this way, the interview data provide further validity regarding the topics covered in the child care provider survey, and ultimately, help to contextualize our rationale for selecting certain indicators to incorporate in the final version of the women’s economic security index for Mississippi.
</p>
<p>During the summer of 2019, staff at the ERC worked to further distill and analyze the oral history transcripts. ERC staff and interns were trained in content analysis by the ERC Associate Director, Dr. Alisa Rod. Content analysis is a method in which humans code qualitative interview data, develop a codebook, and calculate inter-rater reliability/agreement scores to iterate on the process and ensure validity. One ERC intern spearheaded the coding of the transcripts as their summer project, which they completed in stages. The unit of analysis for the coding scheme was each individual interviewee (as opposed to each line or word within the interviews). First, the intern reviewed 5.9 hours of interview audio and created a preliminary codebook with 6 overarching categories of themes and 26 subcategories. A second intern used this codebook to attempt to code a sample of lines from the transcripts, but was unable to meet a reasonable threshold of inter-rater agreement with the first intern. Two additional independent raters (i.e. interns) repeated this process five times, and after each iteration the primary intern revised the codebook and subcategories to further distinguish between independent concepts. Following the fifth independent coding of samples from the transcripts, inter-rater agreement surpassed the minimum threshold of 80% across 8 overarching categories and 33 subcategories (see full codebook below in appendix). The 8 main themes include: Interpersonal relationships; Employment; Understanding Structural Issues; Motherhood; Care; Transportation; Education; and Financial Situation. After finalizing the codebook, ERC interns worked to code all the transcript data across 8 interviews in order to provide users of this site with the ability to interact with the oral history transcripts and engage more closely with thematic context related to facets of economic insecurity among low income women in Mississippi.</p>
	<p>Appendix</p>	
	<p>Codebook</p>
	<div>
	<img src={codingpic1}/>
		
	<img src={codingpic2} style={{verticalAlign: "top"}}/>
	</div>
	<br />
		</div>
	)

export default OralHistMethod