/*'use client';

import * as React from 'react';
import jwtDecode from 'jwt-decode'; // Assurez-vous d'installer jwt-decode
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
];

export function AccountDetailsForm() {
  const [user, setUser] = useState<{ nom?: string; prenom?: string; email?: string; statut?: string; telephone?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Rediriger vers la page de connexion si pas de token
      } else {
        try {
          const decoded: any = jwtDecode(token); // Décoder le token
          setUser({ 
            nom: decoded.nom || '', 
            prenom: decoded.prenom || '', 
            email: decoded.email || '', 
            statut: decoded.statut || '',
            telephone: decoded.telephone || ''
          });
        } catch (error) {
          console.error('Token invalide', error);
          localStorage.removeItem('token'); // Nettoyer le token invalide
          router.push('/auth/sign-in');
        }
      }
      setLoading(false);
    }
  }, [router]);

  // ⚠️ Afficher un "Loading..." tant que les données ne sont pas récupérées
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput defaultValue={user?.nom} label="First name" name="firstName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput defaultValue={user?.prenom} label="Last name" name="lastName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue={user?.email} label="Email address" name="email" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput defaultValue={user?.telephone} label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select defaultValue="new-york" label="State" name="state" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <OutlinedInput defaultValue={user?.statut} label="Status" name="status" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
*/