import React from 'react';
import { Box, Chip } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import type { SvgIconProps } from '@mui/material';
import type { ProjectCategory } from '../../data/types';
import { useAppTheme } from '../../theme/useAppTheme';

const categoryIcons: Record<ProjectCategory, React.ComponentType<SvgIconProps>> = {
  'Cloud & AI': CloudQueueIcon,
  Enterprise: BusinessCenterIcon,
  Healthcare: LocalHospitalIcon,
  'Business & SaaS': StorefrontIcon,
  'Social & Education': GroupsIcon,
};

export const CategoryIcon: React.FC<{ category: ProjectCategory } & SvgIconProps> = ({ category, ...props }) => {
  const Icon = categoryIcons[category];
  return <Icon aria-hidden="true" {...props} />;
};

interface TechChipsProps {
  techStack: string[];
  // Show only the first N chips plus a "+X" chip
  max?: number;
  size?: 'small' | 'medium';
}

export const TechChips: React.FC<TechChipsProps> = ({ techStack, max, size = 'small' }) => {
  const { accent } = useAppTheme();
  const visible = max ? techStack.slice(0, max) : techStack;
  const hidden = techStack.length - visible.length;

  const chipSx = {
    bgcolor: accent.chipBg,
    color: 'primary.main',
    border: `1px solid ${accent.chipBorder}`,
    fontSize: size === 'small' ? '0.75rem' : '0.85rem',
    fontWeight: 600,
    borderRadius: 0,
  };

  return (
    <Box component="ul" aria-label="Tech stack" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0 }}>
      {visible.map((tech) => (
        <li key={tech}>
          <Chip label={tech} size={size} sx={chipSx} />
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Chip label={`+${hidden}`} size={size} sx={{ ...chipSx, color: 'text.secondary' }} title={techStack.slice(visible.length).join(', ')} />
        </li>
      )}
    </Box>
  );
};

export const FeaturedBadge: React.FC = () => {
  const { accent } = useAppTheme();
  return (
    <Chip
      icon={<StarIcon sx={{ fontSize: '0.95rem !important', color: `${accent.contrastText} !important` }} />}
      label="Featured"
      size="small"
      sx={{ background: accent.gradient, color: accent.contrastText, fontWeight: 700, height: 24 }}
    />
  );
};

// Initials tile used where a project screenshot would normally go
export const ProjectMonogram: React.FC<{ name: string; size?: number }> = ({ name, size = 64 }) => {
  const { accent } = useAppTheme();
  const initials = name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <Box
      aria-hidden="true"
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 0,
        background: accent.gradientDiagonal,
        color: accent.contrastText,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: size / 2.6,
        boxShadow: `0 8px 24px ${accent.glow}`,
      }}
    >
      {initials}
    </Box>
  );
};
