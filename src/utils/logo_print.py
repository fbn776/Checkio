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
    """
    return logo
