using System;
    using Projekti.Models;
namespace Projekti.Service
{
    public class MuseumArtifactManager
    {
        public void PerformAction(User user, string action)
        {
            if (user.Role == UserRole.User && action != "View")
            {
                Console.WriteLine("Access denied. Only admins can perform this action.");
                return;
            }

            switch (action)
            {
                case "View":
                    ViewArtifacts();
                    break;
                case "Add":
                    AddArtifact();
                    break;
                case "Delete":
                    DeleteArtifact();
                    break;
                case "Edit":
                    EditArtifact();
                    break;
                default:
                    Console.WriteLine("Invalid action.");
                    break;
            }
        }

        private void ViewArtifacts() => Console.WriteLine("Viewing artifacts...");
        private void AddArtifact() => Console.WriteLine("Adding artifact...");
        private void DeleteArtifact() => Console.WriteLine("Deleting artifact...");
        private void EditArtifact() => Console.WriteLine("Editing artifact...");
    }
}
