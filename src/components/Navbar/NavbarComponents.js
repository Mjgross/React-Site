
import React from 'react'
import {Button } from 'react-daisyui'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavbarButtonLink({name, path}) {
    return (
        <CustomLink to={path}>
            <Button  size="sm">{name}    
            </Button>
        </CustomLink>
      )
};

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <div className={isActive ? "active" : ""}>
        <Link to={to}>
          {children}
        </Link>
      </div>
    )
  }

