import click


def show_logo():
    logo = f"""{click.style("""
            ***            
        ***********        
     *****************     
  *********     *********  
  ******           ******  
  *****                    
  *****                    
  ***** """, fg="bright_blue")}            {click.style("heckio", fg="white")}{click.style("""
  *****                    
  ******           ******  
  *********     *********  
     *****************     
        ***********        
            ***""", fg="bright_blue")} 
            

Built by Aysha Naurin, Abhiram Ashok, Febin Nelson P, Sreelakshmi K of Batch 2022-26 CSE as part of our mini project.
Under the guidance of Dr. Shibu Kumar KB.

---------------------------------------------------------
    """
    return logo
