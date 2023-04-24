import { useFormik } from 'formik';
import React, { useState } from 'react';
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Profile from './Profile';

export const SkillsCreateSchema = z.object({
    technologyId: z.number().optional(),
    technologyName: z.string(),
    level: z.number(),
    isImportant: z.boolean().optional()
  })

const SideBarSchema = z
  .object({
    skills: z
      .array(SkillsCreateSchema)
      .min(3)
      .max(6),
    subSkills: z
      .array(SkillsCreateSchema)
      .min(3)
      .max(6),
    experiences: z.string().array().min(1).max(3),
    additionalInformation: z.array(z.string()).superRefine((val, ctx) => {
      if(val.length > 2) {
          ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 2,
          type: "array",
          inclusive: true,
          message: "You can choose up to 2 options",
        });
      }
    }).optional(),
    // hideLogo: z.boolean()
  })  

  const initiaValues = {
    data: {
      skills: [],
      subSkills: [],
      experiences: [],
      additionalInformation: []
    }
  }

  

 export interface ProfileProps {
    data: {
      skills: string[],
      subSkills: string[]
      experiences: string[],
      additionalInformation: string[]
    }
}

const App = () => {
  
  const [profile, setProfile] = useState<ProfileProps>(initiaValues)

  const formik = useFormik({
    initialValues: {
      skills: [],
      subSkills: [],
      experiences: [],
      additionalInformation: []
    },
    validationSchema: toFormikValidationSchema(SideBarSchema),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => {
      setProfile({
        data: values
      })
    },
  });

  const sideBarOnChange = (e: React.ChangeEvent<any>) => {

    let optionsSelected = e.target.selectedOptions
    let targetValue = optionsSelected[optionsSelected.length -1] ?? []

    console.log(e.target.value, e.target, optionsSelected, optionsSelected[optionsSelected.length -1])

    switch(e.target.name) {
      case 'skills': {                
        let skillsArr = profile.data.skills
        console.log('verify', optionsSelected.length < skillsArr.length)

        if(optionsSelected.length < skillsArr.length) {
          console.log('current array', skillsArr)
          let teste = skillsArr.filter(skill => {
            console.log(skill, targetValue.value, (skill !== targetValue.value))
            return skill !== targetValue.value
          })

          console.log('updated array', skillsArr, teste)
          
          skillsArr.push(targetValue.value)

          setProfile(prevState => ({
            ...prevState,
            skills: [...skillsArr]
          }))                
        }                
          break;
      }
      case 'experiences': {
        // setProfile(prevState => ({
        //   ...prevState,          
        // }))   
        let expArr = profile.data.experiences
        console.log('current array exp', expArr)
        expArr.push(e.target.value)
        console.log('updated array exp', expArr)
        console.log(profile)
        
        break;
      }
      default:
        break;        
    }
  }


  return (
    <>
     <Profile data={profile.data} />
    <form onSubmit={(formik.handleSubmit)} onChange={sideBarOnChange}>      

      <label htmlFor="skills">Skills</label>
      <select 
        id="skills"
        name="skills"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.skills}
        multiple>
        <option value="PHP">PHP</option>
        <option value="Js">Js</option>
        <option value="Ruby">Ruby</option>
        <option value="Delphi">Delphi</option>
        <option value="Python">Python</option>
        <option value="Cobol">Cobol</option>
        <option value="Java">Java</option>
      </select>
      {formik.touched.skills && formik.errors.skills ? (
        <div>{formik.errors.skills}</div>
      ) : null}
<br /><br /><br />
      <label htmlFor="skills">Sub Skills</label>
      <select 
        id="subSkills"
        name="subSkills"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.subSkills}
        multiple>
        <option value="PHP">PHP</option>
        <option value="Js">Js</option>
        <option value="Ruby">Ruby</option>
        <option value="Delphi">Delphi</option>
        <option value="Python">Python</option>
        <option value="Cobol">Cobol</option>
        <option value="Java">Java</option>
      </select>
      {formik.touched.subSkills && formik.errors.subSkills ? (
        <div>{formik.errors.subSkills}</div>
      ) : null}
<br /><br /><br />
      <label htmlFor="skills">Experiences</label>
      <select 
        id="experiences"
        name="experiences"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.experiences}
        multiple>
        <option value="exp-1">Exp 1</option>
        <option value="exp-2">Exp 2</option>
        <option value="exp-3">Exp 3</option>
        <option value="exp-4">Exp 4</option>
        <option value="exp-5">Exp 5</option>
      </select>
      {formik.touched.experiences && formik.errors.experiences ? (
        <div>{formik.errors.experiences}</div>
      ) : null}
<br /><br /><br />
      <label htmlFor="skills">Education and Extra</label>
      <select 
        id="additionalInformation"
        name="additionalInformation"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.additionalInformation}
        multiple>
        <option value="edu-1">Edu 1</option>
        <option value="edu-2">Edu 2</option>
        <option value="awar-1">Edu 3</option>
        <option value="awar-2">Edu 4</option>
      </select>
      {formik.touched.additionalInformation && formik.errors.additionalInformation ? (
        <div>{formik.errors.additionalInformation}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>       
    </>
  );
};

export default App;