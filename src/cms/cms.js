import CMS from 'netlify-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import RecipePostPreview from './preview-templates/RecipePostPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('recipes', RecipePostPreview)
